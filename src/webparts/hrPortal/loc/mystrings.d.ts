declare interface IHrPortalWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HrPortalWebPartStrings' {
  const strings: IHrPortalWebPartStrings;
  export = strings;
}

declare module "*.png" {
  const value: any;
  export = value;
}