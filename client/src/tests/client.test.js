import React from "react";
import renderer from "react-test-renderer";

import {
  Breadcrumbs,
  Calendar,
  Container,
  Download,
  Drawer,
  Filter,
  Footer,
  FormModal,
  IButton,
  Loading,
  Locked,
  Navigation,
  Page,
  DataTable,
  Title
} from "../components";

test("Breadcrumbs - Init", () => {
  const component = renderer.create(<Breadcrumbs />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
