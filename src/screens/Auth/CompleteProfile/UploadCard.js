import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { appIcons } from '../../../assets';
import Img from '../../../components/Img';
import { colors, family, size } from '../../../utils';
const { width, height } = Dimensions.get('window');

class UploadCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryDocuments: [],
      documentCount: 1,
    };
  }


  render() {
    const { galleryDocuments } = this.state;

    return (
      <>

        <View>
          <TouchableOpacity style={styles.imageBtn} onPress={this.pickDocument}>
            <ImageBackground style={styles.propertyImage} resizeMode="cover">
              <Img
                local={true}
                src={appIcons.upload}
                style={styles.up}
                tintColor={colors.primary}
              />
              <Text
                style={[
                  styles.carettext,
                  { color: colors.red, textAlign: 'center' },
                ]}>
                Maximum 10, minimum 3, 1 full {'\n'}
                body picture suggested
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {galleryDocuments?.length > 0 ? (
          <View style={{ height: 60 }}>
            <ScrollView
              style={styles.mainCont}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {galleryDocuments?.map((document, index) => {
                return (
                  <View key={index + 1}>
                    <TouchableOpacity activeOpacity={0.9} >
                      <View style={styles.documentContainer}>
                        <Text style={styles.documentText}>{document.name}</Text>
                        <TouchableOpacity
                          style={styles.closeIconCont}
                          onPress={() => this.removeDocument(document.id)}>
                          <Img
                            local
                            src={appIcons.close}
                            resizeMode={'contain'}
                            style={{ width: 8, height: 8 }}
                            tintColor={colors.white}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainCont: {
    width: '90%',
  },
  documentContainer: {
    width: 85,
    height: 45,
    borderRadius: 30,
    backgroundColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
    paddingHorizontal:8,
    borderWidth:0.5,
    borderColor:colors.lightGray,
  },
  documentText: {
    fontSize: 16,
  },
  closeIconCont: {
    backgroundColor: colors.red,
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: size.xxsmall,
  },
  imageBtn: {
    width: 350,
    height: 130,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.gray,
    overflow: 'hidden',
    marginTop: 18,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  up: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.red,
  },
  carettext: {
    fontSize: size.medium,
    fontFamily: family.SofiaProMedium,
    marginTop: 5,
  },
});

export default UploadCard;
