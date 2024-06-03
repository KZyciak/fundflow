export const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="w-full">
      <h1 className="mb-1 text-3xl font-semibold">
        {title}
        {type === "greeting" && (
          <span className="text-AccentLimeColor">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-grayColor">{subtext}</p>
    </div>
  );
};
