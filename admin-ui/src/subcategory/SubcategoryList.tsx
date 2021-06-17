import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { CATEGORY_TITLE_FIELD } from "../category/CategoryTitle";

export const SubcategoryList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"subcategories"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="ID" source="id" />
        <TextField label="name" source="name" />
        <DateField source="slug" label="slug" />
        <ReferenceField label="title" source="category.id" reference="Category">
          <TextField source={CATEGORY_TITLE_FIELD} />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
