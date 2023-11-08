export default function BudgetReport() {
  return(
    <div>
                Budget Report tab content
    </div>
  ) 
}

// budget report will need to access transactions
// each transaction will need a specific type/category in order to organize
// so we need a list of all transactions and their types...
// and then organize a datagrid by rows of categories
// and tabulate the total amount for each category