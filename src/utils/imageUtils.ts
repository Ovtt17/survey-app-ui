export const isValidImageFormat = (file: File): boolean => {
  const validExtensions = ['jpg', 'jpeg', 'png'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return !!fileExtension && validExtensions.includes(fileExtension);
};