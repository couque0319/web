import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { NoteCard } from "@/components/NoteCard";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    major: "",
    grade: "",
    introduction: "",
  });

  // 프로필 정보 조회
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await (supabase as any)
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      
      // 수정 폼 초기화
      if (data) {
        setEditForm({
          name: data.name || "",
          major: data.major || "",
          grade: data.grade || "",
          introduction: data.introduction || "",
        });
      }
      
      return data;
    },
    enabled: !!user,
  });

  // 내가 작성한 노트 조회
  const { data: myNotes, isLoading: notesLoading } = useQuery({
    queryKey: ["my-notes", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await (supabase as any)
        .from("notes")
        .select(`
          *,
          profiles!notes_user_id_fkey(name),
          subjects(name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // 프로필 수정 mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: typeof editForm) => {
      if (!user) throw new Error("No user");
      const { error } = await (supabase as any)
        .from("profiles")
        .update(updates)
        .eq("id", user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsEditDialogOpen(false);
      toast.success("프로필이 수정되었습니다");
    },
    onError: () => {
      toast.error("프로필 수정에 실패했습니다");
    },
  });

  // 회원 탈퇴 mutation
  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user");
      
      // 프로필 삭제 (cascade로 관련 데이터도 삭제됨)
      const { error: profileError } = await (supabase as any)
        .from("profiles")
        .delete()
        .eq("id", user.id);
      
      if (profileError) throw profileError;
      
      // 인증 사용자 삭제는 RLS 정책상 불가능하므로 로그아웃만 수행
      await signOut();
    },
    onSuccess: () => {
      toast.success("회원 탈퇴가 완료되었습니다");
      navigate("/");
    },
    onError: () => {
      toast.error("회원 탈퇴에 실패했습니다");
    },
  });

  const handleUpdateProfile = () => {
    updateProfileMutation.mutate(editForm);
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate();
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* 프로필 정보 카드 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">내 프로필</CardTitle>
                <CardDescription>회원 정보를 확인하고 수정할 수 있습니다</CardDescription>
              </div>
              <div className="flex gap-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      정보 수정
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>프로필 수정</DialogTitle>
                      <DialogDescription>
                        회원 정보를 수정할 수 있습니다
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">이름</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="major">전공</Label>
                        <Input
                          id="major"
                          value={editForm.major}
                          onChange={(e) => setEditForm({ ...editForm, major: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="grade">학년</Label>
                        <Input
                          id="grade"
                          value={editForm.grade}
                          onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="introduction">소개</Label>
                        <Textarea
                          id="introduction"
                          value={editForm.introduction}
                          onChange={(e) => setEditForm({ ...editForm, introduction: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={handleUpdateProfile} disabled={updateProfileMutation.isPending}>
                        {updateProfileMutation.isPending ? "저장 중..." : "저장"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      회원 탈퇴
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                      <AlertDialogDescription>
                        이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {deleteAccountMutation.isPending ? "처리 중..." : "탈퇴하기"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {profileLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : profile ? (
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">이름</p>
                  <p className="text-base font-medium">{(profile as any)?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">이메일</p>
                  <p className="text-base font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">전공</p>
                  <p className="text-base font-medium">{(profile as any)?.major || "미설정"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">학년</p>
                  <p className="text-base font-medium">{(profile as any)?.grade || "미설정"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">소개</p>
                  <p className="text-base font-medium">{(profile as any)?.introduction || "소개가 없습니다"}</p>
                </div>
              </div>
            ) : (
              <p>프로필 정보를 불러올 수 없습니다</p>
            )}
          </CardContent>
        </Card>

        {/* 내가 작성한 노트 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">내가 작성한 노트</h2>
          {notesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full mb-4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : myNotes && myNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(myNotes as any[]).map((note: any) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">아직 작성한 노트가 없습니다</p>
                <Button className="mt-4" onClick={() => navigate("/notes")}>
                  노트 작성하기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
