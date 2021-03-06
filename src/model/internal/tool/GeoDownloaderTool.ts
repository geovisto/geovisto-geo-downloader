import { 
    IMapForm, 
    IMapFormControl, 
    IMapToolConfig, 
    IMapToolInitProps, 
    IMapToolProps, 
    MapTool 
} from "geovisto";

import GeoDownloaderToolDefaults from "./GeoDownloaderToolDefaults";
import GeoDownloaderToolMapForm from "../form/GeoDownloaderToolMapForm";
import GeoDownloaderToolState from "./GeoDownloaderToolState";
import IGeoDownloaderTool from "../../types/tool/IGeoDownloaderTool";
import IGeoDownloaderToolDefaults from "../../types/tool/IGeoDownloaderToolDefaults";
import IGeoDownloaderToolState from "../../types/tool/IGeoDownloaderToolState";

/**
 * GeoDownladerTool -- 
 * Tool providing basic user interface for downloading GeoJSON objects from OverpassAPI.
 * Objects can be downloaded for more than one administrative level of country. 
 * Can be also used for generating hierarchy definition in case of downloading polygons.
 * 
 * @author Vojtěch Malý
 */
class GeoDownloaderTool extends MapTool implements IMapFormControl, IGeoDownloaderTool {
    private mapForm!: GeoDownloaderToolMapForm;                         
   
    public constructor(props?: IMapToolProps) {
        super(props);
    }

    public getMapForm(): IMapForm {
        if (this.mapForm == undefined) {
            this.mapForm = this.createMapForm() as GeoDownloaderToolMapForm;
        }
        return this.mapForm;
    }

    public getDefaults(): IGeoDownloaderToolDefaults {
        return <IGeoDownloaderToolDefaults>super.getDefaults();
    }

    public createDefaults(): IGeoDownloaderToolDefaults {
        return new GeoDownloaderToolDefaults();
    }

    protected createMapForm(): IMapForm {
        return new GeoDownloaderToolMapForm(this);
    }

    public initialize(initProps: IMapToolInitProps<IMapToolConfig>): this {
        return super.initialize(initProps);
    }

    public getState(): IGeoDownloaderToolState {
        return <IGeoDownloaderToolState>super.getState();
    }

    public createState(): IGeoDownloaderToolState {
        return new GeoDownloaderToolState(this);
    }

    public copy(): IGeoDownloaderTool {
        return new GeoDownloaderTool(this.getProps());
    }

    public create(): this {
        // Bind event listener for zoom to show current zoom level.
        this.changeForm();
        this.getMap()?.getState().getLeafletMap()?.addEventListener("zoom" , this.changeForm, this);

        return this;
    }
    
    /**
     * Update displayed zoom level in form.
     */
    private changeForm() : void {
        if (this.mapForm) {
            const temp = this.getMap()?.getState().getLeafletMap()?.getZoom();
            if (temp) {
                this.mapForm.changeCurrentZoom(temp);
            }
        }
    }

    public setEnabled(enabled: boolean): void {
        this.mapForm.stateChange(enabled);
        super.setEnabled(enabled);
    }

}

export default GeoDownloaderTool;