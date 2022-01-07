import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CollectionItem from '../../components/collection-preview/collection-item/collection-item.component';

import './collection.styles.scss';
import { selectCollection } from "../../redux/shop/shop.selectors";

const CollectionPage = () => {
  let {collectionId} = useParams();
  const collection = useSelector(selectCollection(collectionId));
  const {title, items} = collection;
  return(
    <div className="collection-page">
      <h2 className="title"> {title} </h2>
      <div className="items">
        {
          items.map(item => <CollectionItem key={item.id} item={item}/>)
        }
      </div>
    </div>
  );
};

// const mapStateTopProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.collectionId)(state),
// })


// export default connect(mapStateTopProps)(CollectionPage);

export default CollectionPage;

