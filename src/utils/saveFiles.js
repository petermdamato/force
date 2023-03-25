import { saveAs } from 'file-saver';

export function saveSvg(){
    const svg_data = document.getElementById("chart").innerHTML //put id of your svg element here

    const head = '<svg title="graph" version="1.1" xmlns="http://www.w3.org/2000/svg">'

    //if you have some additional styling like graph edges put them inside <style> tag

    const style = '<style>.App{height:100%;text-align:left}.component-menu{background-color:#3e52b5;color:white;width:200px;position:fixed;height:100vh}.component-menu ul{list-style:none;text-align:center;text-transform:uppercase;padding-left:0}.menu-item{cursor:pointer;padding:10px 0}.menu-item-text{pointer-events:none}.selected{border-top:1px #384ba3 solid;background-color:#3c4fae;margin-top:-1px}.component-content{background-color:#fafafa;height:100%;margin-left:200px;overflow:visible;padding:10px 10px 0 10px;width:calc(100% - 200px)}.component-card{background-color:white;border-radius:5px;box-shadow:4px 4px 4px #d3d3d3;margin-bottom:20px;padding:20px;width:calc(100% - 40px)}.component-card-header{margin:0;text-align:left;width:100% !important}#component-card-info{display:table}.component-card-info-row{display:table-row}.component-card-info-cell{display:table-cell;padding-top:10px;text-align:left}.component-card-info-label{font-weight:bold;width:80px}.moving{fill:none;stroke-width:2px;stroke:black}.connecting-line{fill:none;stroke-width:1px;stroke:black}.dashed{stroke-dasharray:4px 2px;fill:none;stroke-width:4px}.button-main{color:#e6e6e6;font-family:Brandon;font-size:16px}.second-color{margin-left:-5px !important}.dashed.impact-line{stroke:#826c35}.options-container{display:flex;margin-top:2px}.options-label{font-size:12px;margin-top:10px;text-transform:uppercase}.label-logo{margin-left:4px;opacity:.6}.input{margin:0 6px;max-width:200px}.dropdown{margin:0 6px;max-width:200px}.dropdown-container{display:flex}.deactivated select{pointer-events:none;opacity:.4}.input-container{background-color:white;border-radius:5px;margin-right:8px;padding:4px 4px;min-width:200px}.input-text{color:silver;font-weight:500;text-transform:uppercase}.dropdown-container{display:block;background-color:white;padding:4px 4px;border-radius:5px;margin-right:8px;min-width:200px}.dropdown-text{color:silver;font-weight:500;text-transform:uppercase}.checkbox-text{color:silver;font-weight:500;text-transform:uppercase;margin-left:10px}.header-container{margin-bottom:10px}.header-inner{background-color:#bfcbbf;font-size:18px;padding:10px 10px;text-align:center;text-transform:uppercase;width:380px}.italic{font-style:italic}.viz-container{display:flex;justify-content:space-between}#chart{margin-right:20px}input[type="checkbox" i]{accent-color:#95a995 !important;margin-left:6px}.checkboxes-double{display:flex;justify-content:space-between !important;padding-right:30px}.checkboxes{display:grid}.checkbox-container{display:flex}.dropdown-doubled-text{margin-left:36px}.checkbox-text{line-height:28px}.checkbox label{font-weight:300;margin-top:-10px !important}.tick text{font-family:Brandon;font-size:12px}.domain{display:none}.input-header{display:flex}.get-text{background-color:#bfcbbf;margin-top:10px;padding:4px 8px}.button-template{border:2px #545954 solid}.buttons-bar{display:flex;justify-content:space-between;width:640px}#top-buttons-bar{margin-bottom:8px}.circle-color-picker div div p{margin-left:-10px;margin-bottom:4px !important;line-height:8px}.circle-color-picker{margin-left:10px}.color-input::after{display:none}datalist{width:10px !important}button{background-color:#95a995 !important;font-family:Brandon;border-radius:5px !important;margin-left:16px;min-width:120px}button:first-child{margin-left:0}button:hover{box-shadow:2px 2px 10px #95a995 !important;border-radius:5px !important;min-width:120px}#customRange::-webkit-slider-thumb{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}#customRange::-moz-range-thumb{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}.thumb-active::after{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}.thumb::after{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}.thumb::after{display:none}.impact-rect{pointer-events:none}.impact-rect-text{text-transform:uppercase}input[type="color"]{-webkit-appearance:none;border:0;width:32px;height:32px}input[type="color"]::-webkit-color-swatch-wrapper{padding:0}input[type="color"]::-webkit-color-swatch{border:0}.color-picker{margin:0 20px 0 10px !important}.color-picker div p{font-size:12px;line-height:10px;margin:6px 0 0 2px}.color-input-container{height:40px;max-width:40px;position:relative;align-items:center}.color{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.8}.color-icon{z-index:1;top:4px !important;left:6px !important;pointer-events:none;opacity:.3}#swatch{background-color:transparent}.chart-legend{border-radius:5px;margin-top:10px}.input-wrapper{border-radius:5px;background-color:#f1f5f1;display:flex;margin-right:10px}.input-wrapper-second-dot{margin-left:10px}.input-wrapper-second-dot .input-container{min-width:160px !important}.input-wrapper-second-dot div div .input-text{padding:0 10px 0 16px}.scene-hash{cursor:ew-resize}.scene-box{pointer-events:none}.range{position:relative}.range .thumb{position:absolute;display:block;height:30px;width:30px;top:-35px;margin-left:-15px;text-align:center;border-radius:50% 50% 50% 0;transform:scale(0);transform-origin:bottom;transition:transform .2s ease-in-out}.range .thumb:after{position:absolute;display:block;content:"";transform:translateX(-50%);width:100%;height:100%;top:0;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#3b71ca;z-index:-1}.range .thumb .thumb-value{display:block;font-size:12px;line-height:30px;color:#fff;font-weight:500;z-index:2}.range .thumb.thumb-active{transform:scale(1)}.accordion-flush .accordion-button:not(.collapsed){box-shadow:inset 0 -2px 0 #f5f5f5}.accordion-flush .accordion-item{border-bottom:2px solid #f5f5f5}.accordion-borderless .accordion-item{border:0}.accordion-borderless .accordion-item .accordion-button{border-radius:.5rem}.accordion-borderless .accordion-item .accordion-button:not(.collapsed){background-color:#dfe7f6;color:#2c58a0;box-shadow:none}.carousel-control-prev-icon::after{content:"";font-weight:700;font-family:"Font Awesome 6 Pro","Font Awesome 6 Free";font-size:1.7rem}.carousel-control-next-icon::after{content:"";font-weight:700;font-family:"Font Awesome 6 Pro","Font Awesome 6 Free";font-size:1.7rem}.form-range{width:100%;height:1.5rem;padding:0;background-color:transparent;appearance:none}.form-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .25rem rgba(59,113,202,.25)}.form-range::-moz-focus-outer{border:0}.form-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:#3b71ca;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}@media(prefers-reduced-motion:reduce){.form-range::-webkit-slider-thumb{transition:none}}.form-range::-webkit-slider-thumb:active{background-color:#c4d4ef}.form-range::-webkit-slider-runnable-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#e0e0e0;border-color:transparent;border-radius:1rem}.form-range::-moz-range-thumb{width:1rem;height:1rem;background-color:#3b71ca;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}@media(prefers-reduced-motion:reduce){.form-range::-moz-range-thumb{transition:none}}.form-range::-moz-range-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#e0e0e0;border-color:transparent;border-radius:1rem}.form-range:disabled{pointer-events:none}.form-range:disabled::-webkit-slider-thumb{background-color:#9e9e9e}.form-range:disabled::-moz-range-thumb{background-color:#9e9e9e}.form-floating{position:relative}.form-floating>.form-control,.form-floating>.form-select{height:calc(3.5rem + 2px);line-height:1.25}.form-floating>label{position:absolute;top:0;left:0;height:100%;padding:1rem .75rem;pointer-events:none;border:1px solid transparent;transform-origin:0 0;transition:opacity .1s ease-in-out,transform .1s ease-in-out}@media(prefers-reduced-motion:reduce){.form-floating>label{transition:none}}.form-floating>.form-control{padding:1rem .75rem}.form-floating>.form-control::placeholder{color:transparent}.form-floating>.form-control:focus,.form-floating>.form-control:not(:placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:-webkit-autofill{padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-select{padding-top:1.625rem;padding-bottom:.625rem}</style>'

    const full_svg = head +  style + svg_data + "</svg>"

    const blob = new Blob([full_svg], {type: "image/svg+xml"});  
    const filename = "graph.svg"

    saveAs(blob, filename);
};

export function savePng() {

  const svgHtml = document.getElementById("chart"),
    style = '<style>.App{height:100%;text-align:left}.component-menu{background-color:#3e52b5;color:white;width:200px;position:fixed;height:100vh}.component-menu ul{list-style:none;text-align:center;text-transform:uppercase;padding-left:0}.menu-item{cursor:pointer;padding:10px 0}.menu-item-text{pointer-events:none}.selected{border-top:1px #384ba3 solid;background-color:#3c4fae;margin-top:-1px}.component-content{background-color:#fafafa;height:100%;margin-left:200px;overflow:visible;padding:10px 10px 0 10px;width:calc(100% - 200px)}.component-card{background-color:white;border-radius:5px;box-shadow:4px 4px 4px #d3d3d3;margin-bottom:20px;padding:20px;width:calc(100% - 40px)}.component-card-header{margin:0;text-align:left;width:100% !important}#component-card-info{display:table}.component-card-info-row{display:table-row}.component-card-info-cell{display:table-cell;padding-top:10px;text-align:left}.component-card-info-label{font-weight:bold;width:80px}.moving{fill:none;stroke-width:2px;stroke:black}.connecting-line{fill:none;stroke-width:1px;stroke:black}.dashed{stroke-dasharray:4px 2px;fill:none;stroke-width:4px}.button-main{color:#e6e6e6;font-family:Brandon;font-size:16px}.second-color{margin-left:-5px !important}.dashed.impact-line{stroke:#826c35}.options-container{display:flex;margin-top:2px}.options-label{font-size:12px;margin-top:10px;text-transform:uppercase}.label-logo{margin-left:4px;opacity:.6}.input{margin:0 6px;max-width:200px}.dropdown{margin:0 6px;max-width:200px}.dropdown-container{display:flex}.deactivated select{pointer-events:none;opacity:.4}.input-container{background-color:white;border-radius:5px;margin-right:8px;padding:4px 4px;min-width:200px}.input-text{color:silver;font-weight:500;text-transform:uppercase}.dropdown-container{display:block;background-color:white;padding:4px 4px;border-radius:5px;margin-right:8px;min-width:200px}.dropdown-text{color:silver;font-weight:500;text-transform:uppercase}.checkbox-text{color:silver;font-weight:500;text-transform:uppercase;margin-left:10px}.header-container{margin-bottom:10px}.header-inner{background-color:#bfcbbf;font-size:18px;padding:10px 10px;text-align:center;text-transform:uppercase;width:380px}.italic{font-style:italic}.viz-container{display:flex;justify-content:space-between}#chart{margin-right:20px}input[type="checkbox" i]{accent-color:#95a995 !important;margin-left:6px}.checkboxes-double{display:flex;justify-content:space-between !important;padding-right:30px}.checkboxes{display:grid}.checkbox-container{display:flex}.dropdown-doubled-text{margin-left:36px}.checkbox-text{line-height:28px}.checkbox label{font-weight:300;margin-top:-10px !important}.tick text{font-family:Brandon;font-size:12px}.domain{display:none}.input-header{display:flex}.get-text{background-color:#bfcbbf;margin-top:10px;padding:4px 8px}.button-template{border:2px #545954 solid}.buttons-bar{display:flex;justify-content:space-between;width:640px}#top-buttons-bar{margin-bottom:8px}.circle-color-picker div div p{margin-left:-10px;margin-bottom:4px !important;line-height:8px}.circle-color-picker{margin-left:10px}.color-input::after{display:none}datalist{width:10px !important}button{background-color:#95a995 !important;font-family:Brandon;border-radius:5px !important;margin-left:16px;min-width:120px}button:first-child{margin-left:0}button:hover{box-shadow:2px 2px 10px #95a995 !important;border-radius:5px !important;min-width:120px}#customRange::-webkit-slider-thumb{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}#customRange::-moz-range-thumb{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}.thumb-active::after{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}.thumb::after{background-color:#95a995 !important;--tw-ring-color:#95a995 !important;fill:#95a995 !important}.thumb::after{display:none}.impact-rect{pointer-events:none}.impact-rect-text{text-transform:uppercase}input[type="color"]{-webkit-appearance:none;border:0;width:32px;height:32px}input[type="color"]::-webkit-color-swatch-wrapper{padding:0}input[type="color"]::-webkit-color-swatch{border:0}.color-picker{margin:0 20px 0 10px !important}.color-picker div p{font-size:12px;line-height:10px;margin:6px 0 0 2px}.color-input-container{height:40px;max-width:40px;position:relative;align-items:center}.color{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.8}.color-icon{z-index:1;top:4px !important;left:6px !important;pointer-events:none;opacity:.3}#swatch{background-color:transparent}.chart-legend{border-radius:5px;margin-top:10px}.input-wrapper{border-radius:5px;background-color:#f1f5f1;display:flex;margin-right:10px}.input-wrapper-second-dot{margin-left:10px}.input-wrapper-second-dot .input-container{min-width:160px !important}.input-wrapper-second-dot div div .input-text{padding:0 10px 0 16px}.scene-hash{cursor:ew-resize}.scene-box{pointer-events:none}.range{position:relative}.range .thumb{position:absolute;display:block;height:30px;width:30px;top:-35px;margin-left:-15px;text-align:center;border-radius:50% 50% 50% 0;transform:scale(0);transform-origin:bottom;transition:transform .2s ease-in-out}.range .thumb:after{position:absolute;display:block;content:"";transform:translateX(-50%);width:100%;height:100%;top:0;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#3b71ca;z-index:-1}.range .thumb .thumb-value{display:block;font-size:12px;line-height:30px;color:#fff;font-weight:500;z-index:2}.range .thumb.thumb-active{transform:scale(1)}.accordion-flush .accordion-button:not(.collapsed){box-shadow:inset 0 -2px 0 #f5f5f5}.accordion-flush .accordion-item{border-bottom:2px solid #f5f5f5}.accordion-borderless .accordion-item{border:0}.accordion-borderless .accordion-item .accordion-button{border-radius:.5rem}.accordion-borderless .accordion-item .accordion-button:not(.collapsed){background-color:#dfe7f6;color:#2c58a0;box-shadow:none}.carousel-control-prev-icon::after{content:"";font-weight:700;font-family:"Font Awesome 6 Pro","Font Awesome 6 Free";font-size:1.7rem}.carousel-control-next-icon::after{content:"";font-weight:700;font-family:"Font Awesome 6 Pro","Font Awesome 6 Free";font-size:1.7rem}.form-range{width:100%;height:1.5rem;padding:0;background-color:transparent;appearance:none}.form-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .25rem rgba(59,113,202,.25)}.form-range::-moz-focus-outer{border:0}.form-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:#3b71ca;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}@media(prefers-reduced-motion:reduce){.form-range::-webkit-slider-thumb{transition:none}}.form-range::-webkit-slider-thumb:active{background-color:#c4d4ef}.form-range::-webkit-slider-runnable-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#e0e0e0;border-color:transparent;border-radius:1rem}.form-range::-moz-range-thumb{width:1rem;height:1rem;background-color:#3b71ca;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}@media(prefers-reduced-motion:reduce){.form-range::-moz-range-thumb{transition:none}}.form-range::-moz-range-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#e0e0e0;border-color:transparent;border-radius:1rem}.form-range:disabled{pointer-events:none}.form-range:disabled::-webkit-slider-thumb{background-color:#9e9e9e}.form-range:disabled::-moz-range-thumb{background-color:#9e9e9e}.form-floating{position:relative}.form-floating>.form-control,.form-floating>.form-select{height:calc(3.5rem + 2px);line-height:1.25}.form-floating>label{position:absolute;top:0;left:0;height:100%;padding:1rem .75rem;pointer-events:none;border:1px solid transparent;transform-origin:0 0;transition:opacity .1s ease-in-out,transform .1s ease-in-out}@media(prefers-reduced-motion:reduce){.form-floating>label{transition:none}}.form-floating>.form-control{padding:1rem .75rem}.form-floating>.form-control::placeholder{color:transparent}.form-floating>.form-control:focus,.form-floating>.form-control:not(:placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:-webkit-autofill{padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-select{padding-top:1.625rem;padding-bottom:.625rem}</style>',
    svgData = new XMLSerializer().serializeToString(svgHtml),
    svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"}),
    bounding = svgHtml.getBoundingClientRect(),
    width = bounding.width * 2,
    height = bounding.height * 2,
    canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    exportFileName = 'graph.png',
    newBlob = new Blob([svgData.split(';"><g')[0] + ';">' + style + "<g" + svgData.split(';"><g')[1]], {type:"image/svg+xml;charset=utf-8"});
    //Set the canvas width and height before loading the new Image
    canvas.width = width;
    canvas.height = height;
    const image = new Image();
      image.onload = function() {
        //Clear the context
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        //Create blob and save if with FileSaver.js
        canvas.toBlob(function(blob) {
            saveAs(blob, exportFileName);
        });     
      };
    const svgUrl = URL.createObjectURL(newBlob);
    image.src = svgUrl;
    };

export function saveData() {

}