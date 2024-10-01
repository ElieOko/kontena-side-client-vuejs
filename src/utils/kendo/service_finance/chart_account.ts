export const colChartAccount = [
    { field: 'id',title:"N",editable: false,width: '85px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:'numero_compte',title:"Numéro de compte",filter:'text',editable: false,width: '255px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},                 
    { field:"libelle", title : "Libellé", editable: false,filter:'text',editor: false,width: '355px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'}, 
    { field:"nature", title : "Nature du compte", editable: false,filter:'text',editor: false,width: '175px',resizable: false, columnMenu: 'myTemplate',headerClassName: 'customMenu'},
    // { field:"dateSortie", title:"Date de Sortie récents",filter: "date",editable: false}
];