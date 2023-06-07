import { FC } from 'react'
import styles from "../../styles/SingleArticle.module.scss"
import { calculatePaginationRange } from '../../utils/CalculatePaginationRange';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface PaginationProps<T extends string> {
  count: number;
  currentPage: number;
  setCurrentPage: ActionCreatorWithPayload<number, T>
}

const Pagination: FC<PaginationProps<string>> = ({ count, currentPage, setCurrentPage }) => {


  currentPage = currentPage === 0 ? 1 : currentPage;
  const dispatch = useAppDispatch();

  if (isNaN(count) || count === 0) {
    return <></>
  }

  const currentPageRange = calculatePaginationRange(count, currentPage);

  const paginationConditionStartEnd = currentPageRange[0] === 1 &&
    currentPageRange[currentPageRange.length - 1] === count

  const paginationConditionStart = currentPageRange[0] === 1 &&
    currentPageRange[currentPageRange.length - 1] !== count

  const paginationConditionEnd = currentPageRange[0] !== 1 &&
    currentPageRange[currentPageRange.length - 1] === count

  const paginationCondition = currentPageRange[0] !== 1 &&
    currentPageRange[currentPageRange.length - 1] !== count

  return (
    <div className={styles.paginationList}>
      {currentPage !== 1 && <div onClick={() => dispatch(setCurrentPage(currentPage - 1))} className={styles.prev}>
        {'<'}
      </div>}
      {paginationCondition &&
        <div className={styles.paginationList}>
          <>
            <div onClick={() => dispatch(setCurrentPage(1))} className={styles.paginationItem}>1</div>
            <div className={styles.paginationItem}>...</div>
          </>
          {currentPageRange.map(page => {
            return page !== currentPage ?
              <div onClick={() => dispatch(setCurrentPage(page))} key={page} className={styles.paginationItem}>
                {page}
              </div> : <div key={page} style={{ cursor: "default" }} className={styles.paginationItemActive}>
                {page}
              </div>
          })}
          <>
            <div className={styles.paginationItem}>...</div>
            <div onClick={() => dispatch(setCurrentPage(count))} className={styles.paginationItem}>{count}</div>
          </>
        </div>
      }
      {paginationConditionStartEnd &&
        <div className={styles.paginationList}>{
          currentPageRange.map(page => {
            return page !== currentPage ?
              <div onClick={() => dispatch(setCurrentPage(page))} key={page} className={styles.paginationItem}>
                {page}
              </div> : <div key={page} style={{ cursor: "default" }} className={styles.paginationItemActive}>
                {page}
              </div>
          })}
        </div>}
      {paginationConditionStart &&
        <div className={styles.paginationList}>
          {currentPageRange.map(page => {
            return page !== currentPage ?
              <div onClick={() => dispatch(setCurrentPage(page))} key={page} className={styles.paginationItem}>
                {page}
              </div> : <div key={page} style={{ cursor: "default" }} className={styles.paginationItemActive}>
                {page}
              </div>
          })} <>
            <div className={styles.paginationItem}>...</div>
            <div onClick={() => dispatch(setCurrentPage(count))} className={styles.paginationItem}>{count}</div>
          </>
        </div>

      }
      {paginationConditionEnd &&
        <div className={styles.paginationList}>
          <>
            <div onClick={() => dispatch(setCurrentPage(1))} className={styles.paginationItem}>1</div>
            <div className={styles.paginationItem}>...</div>
          </>
          {currentPageRange.map(page => {
            return page !== currentPage ?
              <div onClick={() => dispatch(setCurrentPage(page))} key={page} className={styles.paginationItem}>
                {page}
              </div> : <div key={page} style={{ cursor: "default" }} className={styles.paginationItemActive}>
                {page}
              </div>
          })}
        </div>
      }
      {currentPage !== count &&
        <div onClick={() => dispatch(setCurrentPage(currentPage + 1))} className={styles.next}>
          {'>'}
        </div>
      }
    </div>
  )
}

export default Pagination