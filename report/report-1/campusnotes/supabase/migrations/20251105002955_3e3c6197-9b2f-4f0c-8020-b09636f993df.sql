-- Create chat_rooms table
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_room_members table
CREATE TABLE IF NOT EXISTS public.chat_room_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Enable RLS
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_room_members ENABLE ROW LEVEL SECURITY;

-- Chat rooms policies
CREATE POLICY "Anyone can view active chat rooms"
  ON public.chat_rooms
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can create chat rooms"
  ON public.chat_rooms
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Room creator can update their rooms"
  ON public.chat_rooms
  FOR UPDATE
  USING (auth.uid() = created_by);

-- Chat messages policies
CREATE POLICY "Room members can view messages"
  ON public.chat_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members
      WHERE chat_room_members.room_id = chat_messages.room_id
      AND chat_room_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Room members can send messages"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.chat_room_members
      WHERE chat_room_members.room_id = chat_messages.room_id
      AND chat_room_members.user_id = auth.uid()
    )
  );

-- Chat room members policies
CREATE POLICY "Anyone can view room members"
  ON public.chat_room_members
  FOR SELECT
  USING (true);

CREATE POLICY "Users can join rooms"
  ON public.chat_room_members
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave rooms"
  ON public.chat_room_members
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for chat_rooms updated_at
CREATE TRIGGER update_chat_rooms_updated_at
  BEFORE UPDATE ON public.chat_rooms
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_room_members;