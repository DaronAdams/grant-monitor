import GrantData from '../../../interfaces/GrantData'
import { useEffect } from 'react';
import BudgetTabGrid from '../BudgetTabGrid'
import { useRecoilValue } from 'recoil';
import useGrantBudgetGridListData from '../../../hooks/grants/useGrantBudgetGridListData';
import { grantBudgetGridRowDataListState } from '../../../state/grantBudgetGridRow/atom';
import GrantBudgetGridRow from '../../../interfaces/GrantBudgetGridRow';


interface GrantMainTabProps {
  grantData: GrantData;
}

const BudgetReport:React.FC<GrantMainTabProps> = ({grantData}) => {

  const { budgetRowsLoading } = useGrantBudgetGridListData(grantData.id);
  const  GrantBudgetData: GrantBudgetGridRow[] = useRecoilValue(grantBudgetGridRowDataListState);

  useEffect(() => {
    console.log('Grant Budget Data', GrantBudgetData);
  }, [GrantBudgetData]);


  return(
    <BudgetTabGrid grantBudgetItemData={GrantBudgetData} />
  ) 
}
export default BudgetReport;