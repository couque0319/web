import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [bio, setBio] = useState("");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // @ts-ignore
    const { error } = await (supabase as any).from("profiles").update({
      university: university.trim() || null,
      major: major.trim() || null,
      year: year ? parseInt(year) : null,
      bio: bio.trim() || null,
    }).eq("id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "프로필 업데이트에 실패했습니다.",
      });
      setLoading(false);
      return;
    }

    toast({
      title: "환영합니다!",
      description: "프로필이 설정되었습니다.",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>프로필 설정</CardTitle>
          <CardDescription>
            CampusNotes에 오신 것을 환영합니다! 프로필을 설정해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="university">학교</Label>
              <Input
                id="university"
                type="text"
                placeholder="서울대학교"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">전공</Label>
              <Input
                id="major"
                type="text"
                placeholder="컴퓨터공학"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">학년</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="학년 선택 (선택사항)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1학년</SelectItem>
                  <SelectItem value="2">2학년</SelectItem>
                  <SelectItem value="3">3학년</SelectItem>
                  <SelectItem value="4">4학년</SelectItem>
                  <SelectItem value="5">대학원생</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">자기소개 (선택)</Label>
              <Textarea
                id="bio"
                placeholder="간단한 자기소개를 입력해주세요."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/")}
              >
                건너뛰기
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  "완료"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
