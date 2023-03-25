 import { useState } from "react";
import chartFill from './../assets/Chart_fill.png'
import folder from './../assets/Folder.png'
import chart from './../assets/Chart.png'
import control from './../assets/control.png'
import DropdownAlt from './DropdownAlt';
import Dropdown from './Dropdown';
import Checkbox from "./Checkbox";
import ColorPicker from "./ColorPicker";
import { MDBRange } from 'mdb-react-ui-kit';
import { CSVLink } from "react-csv";
import { savePng, saveSvg } from './../utils/saveFiles'
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle,faCircleDown,faChartSimple, faRotateRight } from '@fortawesome/free-solid-svg-icons'

const dropdownLevels = [{value:"dropdown-1",label:"1"},{value:"dropdown-2",label:"2"}]

const Sidebar = ({ width, thresholds, changeWidth,reset,toggleDistance,apiData,options,colors,toggleOrphans,toggleEdit, changeKeyword,changeCircleColor,nodes,changeTiers, changeThreshold}) => {
  const deliveryArr = [[], [], [], [], toggleEdit, toggleOrphans, toggleDistance, changeKeyword,changeTiers, [], [],]
  // const d = [changeSecondDotColor]
  const [open, setOpen] = useState(true);
  const [dropdown, setDropdown] = useState({});
  const Menus = [
    { title: "Remove", src: chartFill,type:"template" },
    { title: "Remove", src: chartFill, type:"template"},
    { title: "Remove", src: chartFill,type:"template"},
    { title: "Threshold", src: "",gap:true,type:"slider"},
    { title: "Edit Nodes", src: "",type:"checkbox-basic",option:"edit"},
    { title: "Hide Orphans", src: "",type:"checkbox-basic",option:"orphans"},
    { title: "Vary Link Distance", src: "",type:"checkbox-basic",option:"vary"},
    { title: "Keyword", src: "", type:"dropdown", dropdown:nodes, name:"keyword"},
    { title: "Number of Tiers", src: "", type:"dropdown", dropdown:nodes, name:"tiers"},
    { title: "High Color", src: "", type:"color" },
    { title: "Low Color", src: "", type:"color" },
    { title: "Impact Input", src:"", type:"complex-dropdown", gap:true},
    { title: "Presence Input", src:"", type:"complex-dropdown-presence"},
    { title: "Refresh", src: chart,type:"refresh" ,gap: true},
    { title: "Export PNG", src: folder, type:"download"},
    { title: "Export SVG", src: folder,type:"download"},
    { title: "Download Data", src: folder,type:"download-data"},
  ];

  return (
    <div className="flex">
      <div
        className={` sidebar-main ${
          open ? "w-72" : "w-30 "
        } h-screen p-5  pt-8 relative duration-300`}
      >
        <img 
          alt="open-close-control-icon"
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-white origin-left font-medium text-xl duration-50 delay-200 ${
              !open && "scale-0"
            }`}
          >
            Options
          </h1>
        </div>
        <ul className="pt-6 options-list">
          {Menus.map((Menu, index) => {
            if (Menu.type === "template") {
            return  (           
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                  <div className={`${open && "block-display"}`}><FontAwesomeIcon className="svg-clear" icon={faChartSimple} />
                  <div className={`${open && "hidden"} text-sm`}>{Menu.title}</div></div>
                  <span className={`${!open && "hidden"} origin-left duration-50`} onClick={()=>{deliveryArr[index]()}} >
                    {Menu.title}
                  </span>
                </li>
          )
            } else if (Menu.type === "refresh") {
            return  (
                <li
                  key={index}
                  className={`flex ${!open && "expanded"} refresh-entry rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                  <div className={`${open && "block-display"}`}><FontAwesomeIcon className="svg-clear" icon={faRotateRight} />
                  <div className={`${open && "hidden"} text-sm`}>{Menu.title}</div></div>

                  <span className={`${!open && "hidden"} origin-left duration-50`} onClick={()=>{deliveryArr[index]()}} >
                    {Menu.title}
                  </span>
                </li>
          )
            } else if (Menu.type === "checkbox-basic") {
            return  (
                <li
                  key={index}
                  className={`flex ${!open && "expanded"} refresh-entry rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                <div className={`${!open && "hidden"}`}>
                  <div className="checkboxes">
                      <Checkbox label={Menu.title} ischecked={options[Menu.option]} changeOption={deliveryArr[index]} />
                  </div>
                </div>
                </li>
          )
            } else if (Menu.type === "download") {
            return  (
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                  <div className={`${open && "block-display"}`}><FontAwesomeIcon className="svg-clear" icon={faCircleDown} />
                  <div className={`${open && "hidden"} text-sm`}>{Menu.title}</div></div>

                  <span className={`${!open && "hidden"} origin-left duration-50`} onClick={()=>{deliveryArr[index]()}} >
                    {Menu.title}
                  </span>
                </li>
          )
            } else if (Menu.type === "download-data") {
            return  (
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                <div className={`${open && "block-display"}`}><FontAwesomeIcon className="svg-clear" icon={faCircleDown} />
                  <div className={`${open && "hidden"} text-sm`}>{Menu.title}</div></div>
                  <span className={`${!open && "hidden"} origin-left duration-50`} onClick={()=>{deliveryArr[index]()}} >
                    <CSVLink data={apiData} filename={"emotional-intensity-data.csv"}>Download Data</CSVLink>
                  </span>
                </li>
          )
            } else if (Menu.type === "slider") {
           return  (
                <li
                  key={index}
                  className={`flex ${!open && "hidden"} refresh-entry spaced rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                    <div className="slider slider-container">
                          <MDBRange
                            defaultValue={50}
                            max={100}
                            min={0}
                            onMouseDown={(e)=>{
                              $(".thumb").html(`<span class="thumb-value">${(+e.target.value/100).toFixed(2)}</span>`)
                            }}
                            onChange={(e)=>{
                              changeThreshold(e.target.value)
                              $(".thumb").html(`<span class="thumb-value">${(+e.target.value/100).toFixed(2)}</span>`)
                            }}
                            id='customRange'
                            label='Threshold'
                          />
                      </div>

                </li>
          )
            } else if (Menu.type === "dropdown") {
              return  (
                <li
                  key={index}
                  className={`rounded-md ${!open && "hidden"} ${(Menu.title === "Number of Tiers" & options.keyword === "All") && "disabled"} p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                <div className={`${!open && "hidden"}`}>
                <div className={"flex spaced"}>
                    <div className={`infobar ${!open && "hidden"} infobar-${index}`}><span className="infobar-title">{Menu.title}</span>
                        <FontAwesomeIcon className="svg-clear" icon={faQuestionCircle} />
                        <div className="infobar-tooltip"><p>Base templates are preconfigured charts that display stock chart types</p></div>
                    </div>
                    {Menu.title === "Number of Tiers" ? <Dropdown 
                        className='dropdown'
                        id={`${Menu.name}-dropdown`}
                        options={options}
                        changeOption={deliveryArr[index]} 
                        data={dropdownLevels}
                        /> : <DropdownAlt 
                        className='dropdown'
                        id={`${Menu.name}-dropdown`}
                        options={options}
                        changeOption={deliveryArr[index]} 
                        data={Menu.dropdown}
                        />

                    }
                      </div>
            
                      </div>
                </li>
              )
            } else if (Menu.type === "color") {
              return  (
                <li
                  key={index}
                  className={`flex ${!open && "hidden"} spaced rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                <div className={`${!open && "hidden"} flex spaced`}>
                    <div className="default-circle-color">{Menu.title}</div>
                    <ColorPicker hiLo={Menu.title === "High Color" ? "high" : "low"} defaultColor={Menu.title === "High Color" ? colors.high : colors.low} changeColor={changeCircleColor} />
                </div>

                </li>
            )
            } 
            
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;