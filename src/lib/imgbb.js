const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

export const uploadToImgbb = async (file) => {
  if (!IMGBB_KEY) {
    throw new Error("Image upload is not configured");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error("Image upload failed");
  }
  return data.data.display_url;
};
