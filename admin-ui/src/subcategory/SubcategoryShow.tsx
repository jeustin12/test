import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import { CATEGORY_TITLE_FIELD } from "../category/CategoryTitle";

export const SubcategoryShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="ID" source="id" />
        <TextField label="name" source="name" />
        <DateField source="slug" label="slug" />
        <ReferenceField label="title" source="category.id" reference="Category">
          <TextField source={CATEGORY_TITLE_FIELD} />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};
