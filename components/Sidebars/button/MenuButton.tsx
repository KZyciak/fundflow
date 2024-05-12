import styles from "./styles.module.css";

type Props = {
  isActive: boolean;
  setIsActive: () => void;
};

export const MenuButton = ({ isActive, setIsActive }: Props) => {
  return (
    <div className="text-darkest fixed right-2 top-2 z-50">
      <div
        onClick={setIsActive}
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-darkGrey duration-300 hover:bg-grey"
      >
        <div
          className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
        ></div>
      </div>
    </div>
  );
};
