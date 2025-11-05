import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Eye, Bookmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    upvotes_count: number;
    views_count: number;
    created_at: string;
    profiles: {
      name: string | null;
      avatar_url: string | null;
      university: string | null;
      major: string | null;
    } | null;
    subjects: {
      code: string;
      name: string;
    } | null;
  };
  commentsCount?: number;
}

export const NoteCard = ({ note, commentsCount = 0 }: NoteCardProps) => {
  const authorName = note.profiles?.name || "익명";
  const contentPreview = note.content.substring(0, 150) + (note.content.length > 150 ? "..." : "");

  return (
    <Link to={`/notes/${note.id}`}>
      <Card className="transition-all hover:shadow-card hover:-translate-y-1 cursor-pointer h-full">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1">
              {note.title}
            </h3>
          </div>
          
          {note.subjects && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {note.subjects.code}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {note.subjects.name}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {contentPreview}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={note.profiles?.avatar_url || undefined} />
              <AvatarFallback>
                <User className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{authorName}</span>
              {note.profiles?.major && (
                <span className="text-xs text-muted-foreground">
                  {note.profiles.major}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{note.upvotes_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{commentsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{note.views_count}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
