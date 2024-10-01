export const columnsProduct = [
    { field: 'id',title:"N",editable: false,width: '85px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'article.nom',title:"Nom Article",filter:'text',editable: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},                 
    { field:"quantiteEntree", title : "Quantité Entrée", editable: false,filter:'text',editor: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:"contenant", title : "Recipient", editable: false,filter:'text',editor: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"quantiteSortie",title:"Quantité Sortie",editable: true,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"date_creation", title:"Date des Entrées récents",filter: "date",editable: false,width: '195px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    // { field:"dateSortie", title:"Date de Sortie récents",filter: "date",editable: false}
];