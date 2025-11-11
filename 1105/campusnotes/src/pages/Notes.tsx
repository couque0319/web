import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { NoteCard } from "@/components/NoteCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        // @ts-ignore
        .from("subjects")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", searchQuery, selectedSubject, sortBy],
    queryFn: async () => {
      // @ts-ignore
      let query = supabase
        // @ts-ignore
        .from("notes")
        .select(`
          *,
          profiles:author_id(name, avatar_url, university, major),
          subjects:subject_id(code, name)
        `)
        .eq("visibility", "public")
        .eq("is_deleted", false);

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      if (selectedSubject && selectedSubject !== "all") {
        query = query.eq("subject_id", selectedSubject);
      }

      switch (sortBy) {
        case "latest":
          query = query.order("created_at", { ascending: false });
          break;
        case "popular":
          query = query.order("upvotes_count", { ascending: false });
          break;
        case "views":
          query = query.order("views_count", { ascending: false });
          break;
      }

      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">노트 탐색</h1>
          <p className="text-muted-foreground">
            전공별 학습 노트를 탐색하고 공유하세요
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="노트 제목이나 내용으로 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="과목 선택" />
                </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="all">전체 과목</SelectItem>
                  {/* @ts-ignore */}
                  {subjects?.map((subject: any) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="views">조회순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
              </div>
            ))}
          </div>
        ) : notes && notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* @ts-ignore */}
            {notes.map((note: any) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              검색 결과가 없습니다
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notes;
