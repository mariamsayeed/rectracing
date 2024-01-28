export interface RootState {
    menu: {
      activeMenuItem: string;
      actionMenuItem: string;
      socketAccessKey:string;
    };
    toolbox: {
      [key: string]: {
        type: string;
        color: string;
        size: number;
      };
    };
}