import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const strings = {
  nameColumn: "שם",
  typeColumn: "שימוש",
  commentsColumn: "הערות"
};

const columns = [
  {
    title: strings.nameColumn,
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: strings.typeColumn,
    dataIndex: "type",
    sorter: (a, b) => a.type.length - b.type.length
  },
  {
    title: strings.commentsColumn,
    dataIndex: "comments",
    sorter: (a, b) => a.comments.length - b.comments.length
  }
];

const onChange = (pagination, filters, sorter) => {
  console.log("params", pagination, filters, sorter);
};

export class AssetList extends React.Component {
  render() {
    const { assets } = this.props;
    return (
      <Table
        dataSource={
          assets
            ? assets.map((asset, i) => ({
                key: i,
                name: asset.name,
                type: asset.type,
                comments: asset.comments
              }))
            : [{ name: "idan", type: "man", comments: "hello", key: "1" }]
        }
        columns={columns}
        onChange={onChange}
      />
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};
