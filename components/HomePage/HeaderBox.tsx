export const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="w-full mt-5 mb-8">
      <h1 className="text-3xl font-semibold mb-1">
        {title}
        {type === "greeting" && (
          <span className="text-tropicalIndigo">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-textGrey">{subtext}</p>
    </div>
  );
};
