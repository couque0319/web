import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CreateNote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [major, setMajor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith("image/") || fileType === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast({
          title: "파일 형식 오류",
          description: "이미지 또는 PDF 파일만 업로드할 수 있습니다.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "필수 항목 누락",
        description: "제목과 본문 내용을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      let fileUrl = null;
      let fileType = null;

      // Upload file if exists
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await (supabase as any).storage
          .from("note-files")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = (supabase as any).storage
          .from("note-files")
          .getPublicUrl(fileName);

        fileUrl = urlData.publicUrl;
        fileType = file.type;
      }

      // Create note
      const { data: noteData, error: noteError } = await (supabase as any)
        .from("notes")
        .insert({
          author_id: user.id,
          title: title.trim(),
          content: content.trim(),
          major: major.trim() || null,
          file_url: fileUrl,
          file_type: fileType,
          visibility: "public",
        })
        .select()
        .single();

      if (noteError) throw noteError;

      // Create tags and link them to note
      if (tags.length > 0) {
        for (const tagName of tags) {
          // Try to get existing tag or create new one
          let { data: existingTag } = await (supabase as any)
            .from("tags")
            .select("id")
            .eq("name", tagName)
            .maybeSingle();

          let tagId;
          if (existingTag) {
            tagId = existingTag.id;
          } else {
            const { data: newTag, error: tagError } = await (supabase as any)
              .from("tags")
              .insert({ name: tagName })
              .select()
              .single();
            
            if (tagError) throw tagError;
            tagId = newTag.id;
          }

          // Link tag to note
          await (supabase as any)
            .from("notes_tags")
            .insert({
              note_id: noteData.id,
              tag_id: tagId,
            });
        }
      }

      toast({
        title: "노트 공유 완료",
        description: "노트가 성공적으로 공유되었습니다.",
      });

      navigate("/notes");
    } catch (error: any) {
      console.error("Error creating note:", error);
      toast({
        title: "노트 공유 실패",
        description: error.message || "노트 공유 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">노트 작성</h1>
          <p className="text-muted-foreground">
            학습 노트를 작성하고 다른 학생들과 공유하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              placeholder="노트 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">전공</Label>
            <Input
              id="major"
              placeholder="전공을 입력하세요 (예: 컴퓨터공학)"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>태그</Label>
            <div className="flex gap-2">
              <Input
                placeholder="태그를 입력하고 추가 버튼을 눌러주세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                추가
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">본문 내용 *</Label>
            <Textarea
              id="content"
              placeholder="노트 내용을 작성하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>파일 업로드</Label>
            <Card>
              <CardContent className="pt-6">
                {!file ? (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      클릭하여 이미지 또는 PDF 파일 업로드
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon className="h-8 w-8 text-primary" />
                      ) : (
                        <FileText className="h-8 w-8 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={uploading}
              className="flex-1"
            >
              {uploading ? "공유 중..." : "공유"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/notes")}
              disabled={uploading}
            >
              취소
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateNote;
