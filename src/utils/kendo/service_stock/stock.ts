export const columnsStock = [
    { field: 'id',title:"  N",editable: false,width: '85px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'type_stock.name',title:"Stock",filter:'text',editable: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},                 
    // { field:"description", title : "Description", editable: false,filter:'text',editor: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:"product.name", title : "Produit", editable: false,filter:'text',editor: false,width: '155px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"qty_int",title:"Quantité d'entrée",editable: true,width: '185px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"qty_out", title:"Quantité de sortie",editable: false,width: '185px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    { field:"date_updated", title:"Date Opération recente",filter: "date",editable: false,width: '195px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    // { field:"dateSortie", title:"Date de Sortie récents",filter: "date",editable: false}
];
//Telemetry https://www.youtube.com/watch?v=yqHxcm0soTU
