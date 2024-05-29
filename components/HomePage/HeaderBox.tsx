export const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="mb-8 mt-5 w-full">
      <h1 className="mb-1 text-3xl font-semibold">
        {title}
        {type === "greeting" && (
          <span className="text-blue-500">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-textGrey">{subtext}</p>
    </div>
  );
};
