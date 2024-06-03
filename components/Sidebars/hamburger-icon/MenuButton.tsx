import styles from "./styles.module.css";

type Props = {
  isActive: boolean;
  setIsActive: () => void;
};

export const MenuButton = ({ isActive, setIsActive }: Props) => {
  return (
    <div className="absolute right-5 top-5 z-50">
      <div
        onClick={setIsActive}
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full duration-300"
      >
        <div
          className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
        ></div>
      </div>
    </div>
  );
};
