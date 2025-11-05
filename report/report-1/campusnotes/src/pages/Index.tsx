import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { NoteCard } from "@/components/NoteCard";
import { BookOpen, Users, TrendingUp, Search, PlusCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { data: recentNotes, isLoading: notesLoading } = useQuery({
    queryKey: ["recentNotes"],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await (supabase as any).from("notes").select("*, profiles(name, avatar_url, university, major), subjects(code, name)").eq("is_deleted", false).eq("visibility", "public").order("created_at", { ascending: false }).limit(6);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: popularSubjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ["popularSubjects"],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await (supabase as any).from("subjects").select("*").limit(6);
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              전공별 학습 노트,{" "}
              <span className="text-gradient">한 곳에</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              대학교 전공/과목 단위로 학습 노트를 공유하고, 함께 성장하세요.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/notes">
                  <Search className="mr-2 h-5 w-5" />
                  노트 탐색하기
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth?mode=signup">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  시작하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>학습 노트 공유</CardTitle>
              <CardDescription>
                마크다운으로 작성된 노트와 PDF, 이미지를 업로드하고 공유하세요.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>스터디 모집</CardTitle>
              <CardDescription>
                같은 과목을 공부하는 학우들과 스터디를 구성하세요.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-success" />
              </div>
              <CardTitle>포인트 & 뱃지</CardTitle>
              <CardDescription>
                기여하면서 포인트를 쌓고 뱃지를 획득하세요.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Recent Notes Section */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">최신 노트</h2>
            <p className="text-muted-foreground mt-2">
              최근 업로드된 학습 노트를 확인하세요
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/notes">전체보기</Link>
          </Button>
        </div>

        {notesLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentNotes && recentNotes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              아직 노트가 없습니다. 첫 번째 노트를 작성해보세요!
            </CardContent>
          </Card>
        )}
      </section>

      {/* Popular Subjects Section */}
      <section className="container py-16 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              <TrendingUp className="inline h-8 w-8 mr-2 text-primary" />
              인기 과목
            </h2>
            <p className="text-muted-foreground mt-2">
              많은 학생들이 공부하는 과목들을 확인하세요
            </p>
          </div>
        </div>

        {subjectsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : popularSubjects && popularSubjects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularSubjects.map((subject) => (
              <Link key={subject.id} to={`/notes?subject=${subject.code}`}>
                <Card className="transition-all hover:shadow-card hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Badge variant="secondary" className="font-mono">
                          {subject.code}
                        </Badge>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        {subject.department && (
                          <CardDescription>{subject.department}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              아직 등록된 과목이 없습니다.
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
