
-- Create a storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Create policy to allow authenticated users to upload avatars
CREATE POLICY "Allow users to upload their avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Create policy to allow users to update their avatars
CREATE POLICY "Allow users to update their avatars"
ON storage.objects
FOR UPDATE
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Create policy to allow users to delete their avatars
CREATE POLICY "Allow users to delete their avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');

-- Create policy to allow public to view avatars
CREATE POLICY "Allow public to view avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');
