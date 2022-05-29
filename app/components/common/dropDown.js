import React, { Component } from 'react';
import { Image } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';
import SelectDropdown from 'react-native-select-dropdown';


let wide = Layout.width;

export const DropDown = ({ dropData, onSelectionChange }) => {
    console.log("----->>>", dropData)
    return (
        <SelectDropdown
            dropdownStyle={{
                width: wide * 0.3, marginTop: - wide * 0.085,
                backgroundColor: Colors.dropDownBackGround, borderRadius: wide * 0.015,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
            }}
            rowTextStyle={{
                color: Colors.light, fontSize: 13, lineHeight: 12,
                fontFamily: Fonts.Bold,
            }}
            buttonStyle={{
                width: wide * 0.3, height: wide * 0.08,
                backgroundColor: Colors.dropDownBackGround, borderRadius: wide * 0.015,
                // justifyContent: 'center'

            }}
            buttonTextStyle={{
                color: Colors.light, fontSize: 10, lineHeight: 18,
                fontFamily: Fonts.Bold, marginRight: 30,
            }}
            renderDropdownIcon={() =>
                <Image
                    style={{
                        width: wide * 0.035, height: wide * 0.025,
                    }} source={require('../../Images/dropDownIconNew.png')} />
            }
            dropdownIconPosition={'right'}
            data={dropData !== undefined ? dropData : []}
            onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                onSelectionChange(selectedItem);
            }}
            defaultValueByIndex={0}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
    )
}