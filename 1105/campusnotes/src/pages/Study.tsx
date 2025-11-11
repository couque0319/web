import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, MessageCircle } from "lucide-react";

interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  member_count?: number;
}

const Study = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchChatRooms();
  }, [user, navigate]);

  const fetchChatRooms = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("chat_rooms")
        .select(`
          *,
          chat_room_members(count)
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const roomsWithCount = data?.map((room: any) => ({
        ...room,
        member_count: room.chat_room_members?.[0]?.count || 0,
      })) || [];

      setChatRooms(roomsWithCount);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      toast({
        title: "오류",
        description: "채팅방 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      toast({
        title: "오류",
        description: "채팅방 이름을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    try {
      const { data: room, error: roomError } = await (supabase as any)
        .from("chat_rooms")
        .insert({
          name: roomName,
          description: roomDescription,
          created_by: user?.id,
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // 방장을 멤버로 자동 추가
      const { error: memberError } = await (supabase as any)
        .from("chat_room_members")
        .insert({
          room_id: room.id,
          user_id: user?.id,
        });

      if (memberError) throw memberError;

      toast({
        title: "성공",
        description: "채팅방이 생성되었습니다.",
      });

      setRoomName("");
      setRoomDescription("");
      setOpen(false);
      fetchChatRooms();
    } catch (error) {
      console.error("Error creating chat room:", error);
      toast({
        title: "오류",
        description: "채팅방 생성에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      const { error } = await (supabase as any)
        .from("chat_room_members")
        .insert({
          room_id: roomId,
          user_id: user?.id,
        });

      if (error) {
        if (error.code === "23505") {
          // 이미 참여한 방
          navigate(`/study/${roomId}`);
          return;
        }
        throw error;
      }

      toast({
        title: "성공",
        description: "채팅방에 참여했습니다.",
      });

      navigate(`/study/${roomId}`);
    } catch (error) {
      console.error("Error joining chat room:", error);
      toast({
        title: "오류",
        description: "채팅방 참여에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">스터디 채팅방</h1>
            <p className="text-muted-foreground">
              다른 학생들과 함께 공부하고 정보를 공유하세요
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="w-4 h-4 mr-2" />
                채팅방 만들기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 채팅방 만들기</DialogTitle>
                <DialogDescription>
                  스터디 채팅방을 만들어 다른 학생들과 소통하세요
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">채팅방 이름</Label>
                  <Input
                    id="name"
                    placeholder="예: 알고리즘 스터디"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">설명 (선택)</Label>
                  <Textarea
                    id="description"
                    placeholder="채팅방에 대한 간단한 설명을 입력하세요"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateRoom}
                  disabled={creating}
                >
                  {creating ? "생성 중..." : "생성하기"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">채팅방 목록을 불러오는 중...</p>
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold mb-2">아직 채팅방이 없습니다</p>
            <p className="text-muted-foreground mb-4">
              첫 번째 채팅방을 만들어보세요!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {room.name}
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </CardTitle>
                  {room.description && (
                    <CardDescription className="line-clamp-2">
                      {room.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {room.member_count || 0}명 참여 중
                    </span>
                    <Button
                      onClick={() => handleJoinRoom(room.id)}
                      variant="secondary"
                    >
                      입장하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Study;
