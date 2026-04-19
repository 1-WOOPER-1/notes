import { motion } from "motion/react";
import styles from "./DropDown.module.scss";

interface DropDownProps {
  children: React.ReactNode;
}

export function DropDown({ children }: DropDownProps) {
  const dropDownVariants = {
    open: {
      transition: { staggerChildren: 0.1 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
      y: 10,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  };

  return (
    <motion.ul className={styles.dropDown} variants={dropDownVariants}>
      {Array.isArray(children) ? (
        children.map((item, index) => (
          <motion.li
            className={styles.dropDownItem}
            key={index}
            variants={itemVariants}
          >
            {item}
          </motion.li>
        ))
      ) : (
        <motion.li className={styles.dropDownItem} variants={itemVariants}>
          {children}
        </motion.li>
      )}
    </motion.ul>
  );
}
