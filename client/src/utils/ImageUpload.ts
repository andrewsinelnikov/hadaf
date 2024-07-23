export const checkImage = (file: Blob) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return "File does nor exist";

  if (file.size > 2 * 1024 * 1024) err = "The lagest image size 2mb";

  if (!types.includes(file.type)) err = "The image format is png / jpeg";

  return err;
};

export const imageUpload = async (file: Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "yia0918o");
  formData.append("cloud_name", "dige7jdhc");

  const res = await fetch("https://api.cloudinary.com/v1_1/dige7jdhc/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
