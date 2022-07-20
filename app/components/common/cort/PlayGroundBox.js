import React from "react"
import { Image, View } from "react-native";
import Svg, { Path, G, Defs, ClipPath, Text, Circle, ForeignObject } from "react-native-svg"
import { Colors } from "../../../constants";
import TouchableOpacityG from './TouchableOpacityG';

function PlayGroundBox(props) {
  // const [madeOrMissed, setMadeOrMissed] = useState({});

  // const handelMadeOrMissed = (e, val) => {
  //     setMadeOrMissed({
  //         'x': e.nativeEvent.locationX,
  //         'y': e.nativeEvent.locationY, 
  //         "isMade": val
  //     })
  // }
  debugger

  return (
    <Svg
      width={props.width}
      height={props.width * (72.881 / 100)}
      viewBox="0 0 354 258"

      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}

    >
      {props.clickedCourtArea != null && props.clickedCourtArea !== undefined ?
        props.clickedCourtArea.map(obj => {
          debugger
          return (
            <Circle
              r={6}
              strokeWidth={3}
              stroke={obj.isMade ? Colors.btnGren : Colors.btnRed}
              cx={obj.x}
              cy={obj.y}
            // cx={0}
            // cy={0}
            />

          )
        })
        : <></>
      }


      {/* <ForeignObject x={67.22} y={20.22}>
                <Image
                    source={require('../../../Images/blue.png')}
                    style={{ width: 30, height: 30 }}
                />
            </ForeignObject> */}
      {/* <Circle r={8} strokeWidth={4} stroke={Colors.btnGren} cx={67.66} cy={20.66} /> */}

      {/* shape two */}
      <TouchableOpacityG
        // onPress={props.onPressShapeTwo}
        onPress={(e) =>
          props.onPressShapeTwo(e)}
      >
        <Path
          // fill={props.shapeTwoBGColor} 
          d="M32 1H124V51H32z" />


      </TouchableOpacityG>


      {/* shape four */}
      <TouchableOpacityG
        // onPress={props.onPressShapeFour}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }

      >
        <Path
          // fill={props.shapeFourBGColor} 
          d="M125 0H233V134H125z" />
      </TouchableOpacityG>

      {/* shape left curve */}
      <TouchableOpacityG
        // onPress={props.onPressShapeLeftCurve}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M.5 257V102.5h31c21.5 44.297 40.387 62.574 81 88.5l-32 66H.5z"
          // fill={props.shapeLeftCurveBGColor}
          stroke={props.background}
        />
      </TouchableOpacityG>

      {/* shape right curve */}
      <TouchableOpacityG
        // onPress={props.onPressShapeRightCurve}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M353 257V103h-30.17c-20.924 44.153-39.305 62.372-78.83 88.214L275.143 257H353z"
          // fill={props.shapeRightCurveBGColor}
          stroke={props.background}
        />
      </TouchableOpacityG>

      {/* shape left curve 2 */}
      <TouchableOpacityG
        // onPress={props.onPressShapeLeftCurve2}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M125 51H32.5l-.5 50.5 17.5 33 17.5 22L94 179l18.5 11.5 27-56.5h-14l-.5-83z"
          // fill={props.shapeLeftCurve2BGColor}
          stroke={props.background}
        />
      </TouchableOpacityG>

      {/* shape right curve 2 */}
      <TouchableOpacityG
        // onPress={props.onPressShapeRightCurve2}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M229.567 52h92.931l.502 50.319-17.581 32.882-17.582 21.921-27.125 22.419L242.126 191 215 134.703h14.065L229.567 52z"
          // fill={props.shapeRightCurve2BGColor}
          stroke={props.background}
        />
      </TouchableOpacityG>

      {/* shape center circle holder */}
      <TouchableOpacityG
        // onPress={props.onPressShapeCenterCircleHolder}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M139.394 137L113 190.612l26.394 10.92L161.22 206H180v-31.273l-17.765-2.482-11.674-7.446-7.106-10.921L139.394 137zM216.97 137L241 190.612l-24.03 10.92L197.098 206H180v-31.273l16.174-2.482 10.629-7.446 6.47-10.921L216.97 137z"
        // fill={props.shapeCenterCircleHolderBGColor}
        />
      </TouchableOpacityG>

      {/* shape center circle */}
      <TouchableOpacityG
        // onPress={props.onPressShapeCenterCircle}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M214 134h-74v11.642l4.215 12.148 7.962 10.124 14.051 6.074L183.557 175l13.114-4.049 8.899-8.099 7.025-14.679L214 134z"
          // fill={props.shapeCenterCircleBGColor}
          stroke={props.background}
        />
      </TouchableOpacityG>

      {/* shape holder holder left */}
      <TouchableOpacityG
        // onPress={props.onPressShapeHolderLeft}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M112.5 191L81 257h97.5v-50l-16.5-1-27.5-5.5-22-9.5z"
        // fill={props.shapeHolderLeftBGColor}
        />
      </TouchableOpacityG>

      {/* shape holder holder right */}
      <TouchableOpacityG
        // onPress={props.onPressShapeHolderRight} 
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          d="M244 191l31.5 66H178v-50l16.5-1 27.5-5.5 22-9.5z"
        // fill={props.shapeHolderRightBGColor}
        />
      </TouchableOpacityG>

      <G clipPath="url(#clip0_18_1977)">
        {/* shape holder zero */}
        <TouchableOpacityG
          // onPress={props.onPressShapeZero}
          onPress={(e) =>
            props.onPressShapeTwo(e)
          }
        >
          <Path
            // fill={props.shapeZeroBGColor}
            d="M0 0.581177H31.9643V101.704177H0z" />
        </TouchableOpacityG>
        <Path
          d="M0 0v-2h-2v2h2zm0 257.167h-2v2h2v-2zm179 0v2h2v-2h-2zM179 0h2v-2h-2v2zm-53.468 134.25h-2v2h2v-2zM32.255-2H0v4h32.255v-4zM-2 0v101.414h4V0h-4zm0 101.414v155.753h4V101.414h-4zm34.255-2H0v4h32.255v-4zM30.255 0v50.707h4V0h-4zm0 50.707v50.707h4V50.707h-4zm2 2h93.277v-4H32.255v4zM125.532-2H32.255v4h93.277v-4zm2 52.707V0h-4v50.707h4zM179-2h-39.519v4H179v-4zm-39.519 0h-13.949v4h13.949v-4zm-2 2v134.25h4V0h-4zm2 132.25h-13.949v4h13.949v-4zm-11.949 2V50.707h-4v83.543h4zm11.949 2H179v-4h-39.519v4zM0 259.167h80.782v-4H0v4zm80.782 0H179v-4H80.782v4zM181 174.641V134.25h-4v40.391h4zm-43.519-40.391c0 13.211 3.115 23.89 10.06 31.265 6.967 7.397 17.461 11.126 31.459 11.126v-4c-13.316 0-22.583-3.536-28.547-9.868-5.985-6.356-8.972-15.872-8.972-28.523h-4zm43.519 0V29.058h-4V134.25h4zm0-105.192V0h-4v29.058h4zm-21.179 2H179v-4h-19.179v4zM82.587 258.03l31.639-66.253-3.61-1.724-31.638 66.253 3.61 1.724zm31.639-66.253l27.059-56.664-3.609-1.724-27.06 56.664 3.61 1.724zM181 257.167v-50.561h-4v50.561h4zm0-50.561v-31.965h-4v31.965h4zm-69.421-13.878c12.555 5.832 22.293 9.718 32.477 12.183 10.191 2.468 20.741 3.492 34.915 3.694l.058-3.999c-14.01-.2-24.236-1.21-34.032-3.582-9.804-2.374-19.264-6.132-31.733-11.924l-1.685 3.628zm-81.146-90.489c9.68 21.383 18.792 37.003 31.097 50.789 12.296 13.776 27.697 25.623 49.824 39.578l2.134-3.384c-21.99-13.867-37.035-25.483-48.974-38.858-11.93-13.366-20.844-28.585-30.437-49.775l-3.644 1.65z"
          fill={props.background}
        />
        <Path
          d="M177.709 29.93a4.94 4.94 0 000 9.88v-9.88zM149.942 29.93a29.046 29.046 0 008.511 20.548A29.048 29.048 0 00179 58.988v-1.952a27.11 27.11 0 01-25.042-16.733 27.108 27.108 0 01-2.063-10.373h-1.953zM141.48 133.959c0-2.628.176-5.107.51-7.442l-3.96-.565a56.556 56.556 0 00-.55 8.007h4zm1.633-12.881c1.416-5.141 3.689-9.451 6.57-12.982l-3.099-2.529c-3.246 3.979-5.769 8.792-7.327 14.449l3.856 1.062zm10.369-16.908c3.687-3.216 8.035-5.544 12.752-7.01l-1.187-3.82c-5.199 1.616-10.05 4.201-14.194 7.815l2.629 3.015zm18.138-8.287a44.68 44.68 0 017.38-.605v-4c-2.709 0-5.402.217-8.041.66l.661 3.945z"
          fill={props.background}
        />
      </G>

      {/* shape six - right horizontal top */}
      <TouchableOpacityG
        // onPress={props.onPressShapeRightHTop}
        onPress={(e) =>
          props.onPressShapeTwo(e)
        }
      >
        <Path
          // fill={props.shapeRightHTopBGCol}
          d="M230 0H326V50H230z" />
      </TouchableOpacityG>
      <G clipPath="url(#clip1_18_1977)">

        {/* shape seven - right verticle top */}
        <TouchableOpacityG
          // onPress={props.onPressShapeRightVTop}
          onPress={(e) =>
            props.onPressShapeTwo(e)
          }
        >
          <Path
            transform="matrix(-1 0 0 1 354 .581)"
            // fill={props.shapeRightVTopBGColor}

            d="M0 0H31.9643V101.123H0z"
          />
        </TouchableOpacityG>
        <Path
          d="M354 0v-2h2v2h-2zm0 257.167h2v2h-2v-2zm-179 0v2h-2v-2h2zM175 0h-2v-2h2v2zm53.468 134.25h2v2h-2v-2zM321.745-2H354v4h-32.255v-4zM356 0v101.414h-4V0h4zm0 101.414v155.753h-4V101.414h4zm-34.255-2H354v4h-32.255v-4zm2-99.414v50.707h-4V0h4zm0 50.707v50.707h-4V50.707h4zm-2 2h-93.277v-4h93.277v4zM228.468-2h93.277v4h-93.277v-4zm-2 52.707V0h4v50.707h-4zM175-2h39.519v4H175v-4zm39.519 0h13.949v4h-13.949v-4zm2 2v134.25h-4V0h4zm-2 132.25h13.949v4h-13.949v-4zm11.949 2V50.707h4v83.543h-4zm-11.949 2H175v-4h39.519v4zM354 259.167h-80.782v-4H354v4zm-80.782 0H175v-4h98.218v4zM173 174.641V134.25h4v40.391h-4zm43.519-40.391c0 13.211-3.115 23.89-10.06 31.265-6.967 7.397-17.461 11.126-31.459 11.126v-4c13.316 0 22.583-3.536 28.547-9.868 5.985-6.356 8.972-15.872 8.972-28.523h4zm-43.519 0V29.058h4V134.25h-4zm0-105.192V0h4v29.058h-4zm21.179 2H175v-4h19.179v4zm77.234 226.971l-31.639-66.253 3.61-1.724 31.638 66.253-3.609 1.724zm-31.639-66.253l-27.059-56.664 3.609-1.724 27.06 56.664-3.61 1.724zM173 257.167v-50.561h4v50.561h-4zm0-50.561v-31.965h4v31.965h-4zm69.421-13.878c-12.555 5.832-22.293 9.718-32.477 12.183-10.191 2.468-20.741 3.492-34.915 3.694l-.058-3.999c14.01-.2 24.236-1.21 34.032-3.582 9.804-2.374 19.264-6.132 31.733-11.924l1.685 3.628zm81.146-90.489c-9.68 21.383-18.792 37.003-31.097 50.789-12.296 13.776-27.697 25.623-49.824 39.578l-2.134-3.384c21.989-13.867 37.035-25.483 48.974-38.858 11.931-13.366 20.844-28.585 30.437-49.775l3.644 1.65z"
          fill={props.background}
        // fill={Colors.lightBlue}

        />
        <Path
          d="M176.291 29.93a4.94 4.94 0 010 9.88v-9.88zM204.058 29.93a29.046 29.046 0 01-8.511 20.548A29.048 29.048 0 01175 58.988v-1.952a27.11 27.11 0 0025.042-16.733 27.108 27.108 0 002.063-10.373h1.953zM212.52 133.959c0-2.628-.176-5.107-.51-7.442l3.96-.565c.362 2.532.55 5.201.55 8.007h-4zm-1.633-12.881c-1.416-5.141-3.689-9.451-6.57-12.982l3.099-2.529c3.246 3.979 5.769 8.792 7.327 14.449l-3.856 1.062zm-10.369-16.908c-3.687-3.216-8.035-5.544-12.752-7.01l1.187-3.82c5.199 1.616 10.05 4.201 14.194 7.815l-2.629 3.015zm-18.138-8.287a44.68 44.68 0 00-7.38-.605v-4c2.709 0 5.402.217 8.041.66l-.661 3.945z"
          fill={props.background}

        />
      </G>

      {/* row 1 texts  */}
      <Text x="2%" y="20%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeZeroTextColor}>{props.shapeZeroText}</Text>
      <Text x="20%" y="12%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeTwoTextColor}>{props.shapeTwoText}</Text>
      <Text x="47%" y="30%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeFourTextColor}>{props.shapeFourText}</Text>
      <Text x="75%" y="12%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeRightHTopTextColor}>{props.shapeRightHTopText}</Text>
      <Text x="92.5%" y="20%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeRightVTopTextColor}>{props.shapeRightVTopText}</Text>

      {/* row 2 texts  */}
      <Text x="9%" y="77%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeLeftCurveTextColor}>{props.shapeLeftCurveText}</Text>
      <Text x="20%" y="42%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeLeftCurve2TextColor}>{props.shapeLeftCurve2Text}</Text>
      <Text x="48%" y="75%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeCenterCircleHolderTextColor}>{props.shapeCenterCircleHolderText}</Text>
      <Text x="48%" y="92%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeCenterCircleTextColor}>{props.shapeCenterCircleText}</Text>
      <Text x="75%" y="42%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeRightCurve2TextColor}>{props.shapeRightCurve2Text}</Text>
      <Text x="86%" y="77%" dominant-baseline="middle" text-anchor="middle" fill={props.shapeRightCurveTextColor}>{props.shapeRightCurveText}</Text>



      {/* <Path
                d="M11.004 48.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM75.004 28.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM173.004 82.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM274.004 28.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM333.004 48.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM310.004 199.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM34.004 199.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM174.004 194.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM173.004 236.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM271.682 109.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.267 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zM75.326 109.144c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88zm4.14 1.236l3.156-8.448h-1.02l-3.168 8.448h1.032zm6.268 0c1.824 0 2.928-1.584 2.928-4.116 0-2.532-1.104-4.104-2.928-4.104-1.824 0-2.928 1.572-2.928 4.104s1.104 4.116 2.928 4.116zm0-1.236c-.996 0-1.512-1.152-1.512-2.88s.516-2.88 1.512-2.88 1.512 1.152 1.512 2.88-.516 2.88-1.512 2.88z"
                fill="#fff"
            /> */}
      <Defs>
        <ClipPath id="clip0_18_1977">
          <Path fill="#fff" d="M0 0H177V257H0z" />
        </ClipPath>
        <ClipPath id="clip1_18_1977">
          <Path
            fill="#fff"
            transform="matrix(-1 0 0 1 354 0)"
            d="M0 0H177V257H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PlayGroundBox
