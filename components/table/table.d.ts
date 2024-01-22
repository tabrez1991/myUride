type ExpandableFuntion = (row: any) => any;
export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  sortable: boolean;
  cell?: any | undefined;
  minWidth?: number;
  stickyClass?: 'stickyRight' | 'stickyLeft' | undefined;
  stickyAt?: string | undefined;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell[];
  serialNo: boolean | undefined;
  expandIconAt: 'start' | 'end' | undefined;
  selectable: boolean | undefined;
  numSelected: number;
  rowCount: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  serialNoName?: string
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  actions: any[];
  selected: readonly string[];
}

export interface EnhancedTableProps {
  rows: any[];
  headCells: readonly HeadCell[];
  uniqueKey: string;
  pagination?: boolean;
  expandable?: ExpandableFuntion | undefined;
  expandInCols?: number | undefined;
  serialNo?: boolean;
  expandIconAt?: 'start' | 'end' | undefined;
  selectable?: boolean | undefined;
  sortable?: boolean;
  actions?: any[];
  loading?: boolean;
  tableRef?: any;
  tableTitle?: any;
  excelFileName?: string;
  order?: Order;
  orderBy?: string;
  showTotal?: boolean;
}
export interface PaginatedTableProps {
  totalLength?: number | undefined | string;
  setPageNumberClicked?: Function | undefined;
  setRecordsToShow?: Function | undefined;
  rows: any[];
  headCells: readonly HeadCell[];
  uniqueKey: string;
  pagination?: boolean;
  expandable?: ExpandableFuntion | undefined;
  expandInCols?: number | undefined;
  serialNo?: boolean;
  expandIconAt?: 'start' | 'end' | undefined;
  selectable?: boolean | undefined;
  sortable?: boolean;
  actions?: any[];
  loading?: boolean;
  tableRef?: any;
  tableTitle?: any;
  excelFileName?: string;
  order?: Order;
  orderBy?: string;
  showTotal?: boolean;
  customRowPerPage?: number;
  serialNoName?: string
}

export interface CollapsibleRowProps {
  row: any;
  serialNo: number | undefined;
  headCells: readonly HeadCell[];
  expand?: ExpandableFuntion | undefined;
  expandInCols?: number | undefined;
  expandIconAt?: 'start' | 'end';
  selectable?: any;
}

export interface ActionProps { }

export interface TableHTMLProps {
  rows: any;
  headCells: readonly HeadCell[];
  title: any;
  uniqueKey: string;
}
