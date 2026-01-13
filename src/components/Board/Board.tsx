

import styles from "./Board.module.css";
// interface BoardsProp {
//   boards: string[];
// }
export const Boards = ({ boards, activeBoardId }) => {

  return (
    <div className={styles.boardContainer}>
      {boards.map((board) => {
        // dispatch an action to mark board active
        return <button key={board.id}
          className={`${board.id === activeBoardId} ? ${styles.highlight} : ''`}>⬅️ {board.name}</button>;
      })}
    </div>
  );
};
