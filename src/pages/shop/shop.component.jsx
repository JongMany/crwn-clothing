import React, {Component} from "react";
import { Routes, Route} from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {   
  state ={
    loading: true,
  };

  unsubscribeFromSnapShot = null;
  //snapshot은 collections Array의 snapshot 표현이 될 것임
  componentDidMount(){
    const {updateCollections} = this.props;
    const CollectionRef = firestore.collection('collections');
 /*    CollectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false})
    }) */
    CollectionRef.get().then(snapshot=>{
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    })
/*     const url = 'https://firestore.googleapis.com/v1/projects/crwn-db-8316b/databases/(default)/documents/'
    fetch( `${url}collections`)
    .then(response => response.json())
    .then(response=>console.log(response)); */

  }

  render(){
    const {loading} = this.state;
    return(
      <div className="shop-page">
        <Routes>
          <Route path='/' element={<CollectionsOverviewWithSpinner isLoading={loading} />} />
          <Route path=':collectionId' element={<CollectionPageWithSpinner isLoading={loading}/>} /> 
        </Routes>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap)),
})
export default connect(null,mapDispatchToProps)(ShopPage);
