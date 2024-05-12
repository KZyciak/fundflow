import styles from "./styles.module.css";

type Props = {
  isActive: boolean;
  setIsActive: () => void;
};

export const MenuButton = ({ isActive, setIsActive }: Props) => {
  return (
    <div className="text-darkest fixed right-0 top-0 z-50">
      <div
        onClick={setIsActive}
        className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[50%] bg-primary shadow-sm"
      >
        <div
          className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
        ></div>
      </div>
    </div>
  );
};
