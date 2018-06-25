
/**
 * This is a generated class and is not intended for modification.  
 */
package valueObjects
{
import com.adobe.fiber.styles.IStyle;
import com.adobe.fiber.styles.Style;
import com.adobe.fiber.styles.StyleValidator;
import com.adobe.fiber.valueobjects.AbstractEntityMetadata;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import mx.events.ValidationResultEvent;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _GuiTransactionDetailsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("trsfprod_prodcode", "trsf_qty_amb", "trsf_temp", "trsf_qty_cor", "eqpt_code", "trsf_trailercomp", "trsf_baa_code", "baa_bay_seq", "trsf_load_kg", "trsf_id", "trsf_qty_kg", "trsf_density", "trsftrid_trsa_id", "prod_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("trsfprod_prodcode", "trsf_qty_amb", "trsf_temp", "trsf_qty_cor", "eqpt_code", "trsf_trailercomp", "trsf_baa_code", "baa_bay_seq", "trsf_load_kg", "trsf_id", "trsf_qty_kg", "trsf_density", "trsftrid_trsa_id", "prod_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("trsfprod_prodcode", "trsf_qty_amb", "trsf_temp", "trsf_qty_cor", "eqpt_code", "trsf_trailercomp", "trsf_baa_code", "baa_bay_seq", "trsf_load_kg", "trsf_id", "trsf_qty_kg", "trsf_density", "trsftrid_trsa_id", "prod_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("trsfprod_prodcode", "trsf_qty_amb", "trsf_temp", "trsf_qty_cor", "eqpt_code", "trsf_trailercomp", "trsf_baa_code", "baa_bay_seq", "trsf_load_kg", "trsf_id", "trsf_qty_kg", "trsf_density", "trsftrid_trsa_id", "prod_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("trsfprod_prodcode", "trsf_qty_amb", "trsf_temp", "trsf_qty_cor", "eqpt_code", "trsf_trailercomp", "trsf_baa_code", "baa_bay_seq", "trsf_load_kg", "trsf_id", "trsf_qty_kg", "trsf_density", "trsftrid_trsa_id", "prod_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GuiTransactionDetails";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _trsfprod_prodcodeIsValid:Boolean;
    model_internal var _trsfprod_prodcodeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsfprod_prodcodeIsValidCacheInitialized:Boolean = false;
    model_internal var _trsfprod_prodcodeValidationFailureMessages:Array;
    
    model_internal var _trsf_qty_ambIsValid:Boolean;
    model_internal var _trsf_qty_ambValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_qty_ambIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_qty_ambValidationFailureMessages:Array;
    
    model_internal var _trsf_tempIsValid:Boolean;
    model_internal var _trsf_tempValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_tempIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_tempValidationFailureMessages:Array;
    
    model_internal var _trsf_qty_corIsValid:Boolean;
    model_internal var _trsf_qty_corValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_qty_corIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_qty_corValidationFailureMessages:Array;
    
    model_internal var _eqpt_codeIsValid:Boolean;
    model_internal var _eqpt_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_codeValidationFailureMessages:Array;
    
    model_internal var _trsf_trailercompIsValid:Boolean;
    model_internal var _trsf_trailercompValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_trailercompIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_trailercompValidationFailureMessages:Array;
    
    model_internal var _trsf_baa_codeIsValid:Boolean;
    model_internal var _trsf_baa_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_baa_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_baa_codeValidationFailureMessages:Array;
    
    model_internal var _baa_bay_seqIsValid:Boolean;
    model_internal var _baa_bay_seqValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _baa_bay_seqIsValidCacheInitialized:Boolean = false;
    model_internal var _baa_bay_seqValidationFailureMessages:Array;
    
    model_internal var _trsf_load_kgIsValid:Boolean;
    model_internal var _trsf_load_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_load_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_load_kgValidationFailureMessages:Array;
    
    model_internal var _trsf_idIsValid:Boolean;
    model_internal var _trsf_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_idIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_idValidationFailureMessages:Array;
    
    model_internal var _trsf_qty_kgIsValid:Boolean;
    model_internal var _trsf_qty_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_qty_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_qty_kgValidationFailureMessages:Array;
    
    model_internal var _trsf_densityIsValid:Boolean;
    model_internal var _trsf_densityValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_densityIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_densityValidationFailureMessages:Array;
    
    model_internal var _trsftrid_trsa_idIsValid:Boolean;
    model_internal var _trsftrid_trsa_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsftrid_trsa_idIsValidCacheInitialized:Boolean = false;
    model_internal var _trsftrid_trsa_idValidationFailureMessages:Array;
    
    model_internal var _prod_nameIsValid:Boolean;
    model_internal var _prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_GuiTransactionDetails;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GuiTransactionDetailsEntityMetadata(value : _Super_GuiTransactionDetails)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["trsfprod_prodcode"] = new Array();
            model_internal::dependentsOnMap["trsf_qty_amb"] = new Array();
            model_internal::dependentsOnMap["trsf_temp"] = new Array();
            model_internal::dependentsOnMap["trsf_qty_cor"] = new Array();
            model_internal::dependentsOnMap["eqpt_code"] = new Array();
            model_internal::dependentsOnMap["trsf_trailercomp"] = new Array();
            model_internal::dependentsOnMap["trsf_baa_code"] = new Array();
            model_internal::dependentsOnMap["baa_bay_seq"] = new Array();
            model_internal::dependentsOnMap["trsf_load_kg"] = new Array();
            model_internal::dependentsOnMap["trsf_id"] = new Array();
            model_internal::dependentsOnMap["trsf_qty_kg"] = new Array();
            model_internal::dependentsOnMap["trsf_density"] = new Array();
            model_internal::dependentsOnMap["trsftrid_trsa_id"] = new Array();
            model_internal::dependentsOnMap["prod_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["trsfprod_prodcode"] = "String";
        model_internal::propertyTypeMap["trsf_qty_amb"] = "String";
        model_internal::propertyTypeMap["trsf_temp"] = "String";
        model_internal::propertyTypeMap["trsf_qty_cor"] = "String";
        model_internal::propertyTypeMap["eqpt_code"] = "String";
        model_internal::propertyTypeMap["trsf_trailercomp"] = "String";
        model_internal::propertyTypeMap["trsf_baa_code"] = "String";
        model_internal::propertyTypeMap["baa_bay_seq"] = "String";
        model_internal::propertyTypeMap["trsf_load_kg"] = "String";
        model_internal::propertyTypeMap["trsf_id"] = "String";
        model_internal::propertyTypeMap["trsf_qty_kg"] = "Object";
        model_internal::propertyTypeMap["trsf_density"] = "String";
        model_internal::propertyTypeMap["trsftrid_trsa_id"] = "String";
        model_internal::propertyTypeMap["prod_name"] = "String";

        model_internal::_instance = value;
        model_internal::_trsfprod_prodcodeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsfprod_prodcode);
        model_internal::_trsfprod_prodcodeValidator.required = true;
        model_internal::_trsfprod_prodcodeValidator.requiredFieldError = "trsfprod_prodcode is required";
        //model_internal::_trsfprod_prodcodeValidator.source = model_internal::_instance;
        //model_internal::_trsfprod_prodcodeValidator.property = "trsfprod_prodcode";
        model_internal::_trsf_qty_ambValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_qty_amb);
        model_internal::_trsf_qty_ambValidator.required = true;
        model_internal::_trsf_qty_ambValidator.requiredFieldError = "trsf_qty_amb is required";
        //model_internal::_trsf_qty_ambValidator.source = model_internal::_instance;
        //model_internal::_trsf_qty_ambValidator.property = "trsf_qty_amb";
        model_internal::_trsf_tempValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_temp);
        model_internal::_trsf_tempValidator.required = true;
        model_internal::_trsf_tempValidator.requiredFieldError = "trsf_temp is required";
        //model_internal::_trsf_tempValidator.source = model_internal::_instance;
        //model_internal::_trsf_tempValidator.property = "trsf_temp";
        model_internal::_trsf_qty_corValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_qty_cor);
        model_internal::_trsf_qty_corValidator.required = true;
        model_internal::_trsf_qty_corValidator.requiredFieldError = "trsf_qty_cor is required";
        //model_internal::_trsf_qty_corValidator.source = model_internal::_instance;
        //model_internal::_trsf_qty_corValidator.property = "trsf_qty_cor";
        model_internal::_eqpt_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_code);
        model_internal::_eqpt_codeValidator.required = true;
        model_internal::_eqpt_codeValidator.requiredFieldError = "eqpt_code is required";
        //model_internal::_eqpt_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_codeValidator.property = "eqpt_code";
        model_internal::_trsf_trailercompValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_trailercomp);
        model_internal::_trsf_trailercompValidator.required = true;
        model_internal::_trsf_trailercompValidator.requiredFieldError = "trsf_trailercomp is required";
        //model_internal::_trsf_trailercompValidator.source = model_internal::_instance;
        //model_internal::_trsf_trailercompValidator.property = "trsf_trailercomp";
        model_internal::_trsf_baa_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_baa_code);
        model_internal::_trsf_baa_codeValidator.required = true;
        model_internal::_trsf_baa_codeValidator.requiredFieldError = "trsf_baa_code is required";
        //model_internal::_trsf_baa_codeValidator.source = model_internal::_instance;
        //model_internal::_trsf_baa_codeValidator.property = "trsf_baa_code";
        model_internal::_baa_bay_seqValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBaa_bay_seq);
        model_internal::_baa_bay_seqValidator.required = true;
        model_internal::_baa_bay_seqValidator.requiredFieldError = "baa_bay_seq is required";
        //model_internal::_baa_bay_seqValidator.source = model_internal::_instance;
        //model_internal::_baa_bay_seqValidator.property = "baa_bay_seq";
        model_internal::_trsf_load_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_load_kg);
        model_internal::_trsf_load_kgValidator.required = true;
        model_internal::_trsf_load_kgValidator.requiredFieldError = "trsf_load_kg is required";
        //model_internal::_trsf_load_kgValidator.source = model_internal::_instance;
        //model_internal::_trsf_load_kgValidator.property = "trsf_load_kg";
        model_internal::_trsf_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_id);
        model_internal::_trsf_idValidator.required = true;
        model_internal::_trsf_idValidator.requiredFieldError = "trsf_id is required";
        //model_internal::_trsf_idValidator.source = model_internal::_instance;
        //model_internal::_trsf_idValidator.property = "trsf_id";
        model_internal::_trsf_qty_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_qty_kg);
        model_internal::_trsf_qty_kgValidator.required = true;
        model_internal::_trsf_qty_kgValidator.requiredFieldError = "trsf_qty_kg is required";
        //model_internal::_trsf_qty_kgValidator.source = model_internal::_instance;
        //model_internal::_trsf_qty_kgValidator.property = "trsf_qty_kg";
        model_internal::_trsf_densityValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_density);
        model_internal::_trsf_densityValidator.required = true;
        model_internal::_trsf_densityValidator.requiredFieldError = "trsf_density is required";
        //model_internal::_trsf_densityValidator.source = model_internal::_instance;
        //model_internal::_trsf_densityValidator.property = "trsf_density";
        model_internal::_trsftrid_trsa_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsftrid_trsa_id);
        model_internal::_trsftrid_trsa_idValidator.required = true;
        model_internal::_trsftrid_trsa_idValidator.requiredFieldError = "trsftrid_trsa_id is required";
        //model_internal::_trsftrid_trsa_idValidator.source = model_internal::_instance;
        //model_internal::_trsftrid_trsa_idValidator.property = "trsftrid_trsa_id";
        model_internal::_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_name);
        model_internal::_prod_nameValidator.required = true;
        model_internal::_prod_nameValidator.requiredFieldError = "prod_name is required";
        //model_internal::_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_prod_nameValidator.property = "prod_name";
    }

    override public function getEntityName():String
    {
        return model_internal::entityName;
    }

    override public function getProperties():Array
    {
        return model_internal::allProperties;
    }

    override public function getAssociationProperties():Array
    {
        return model_internal::allAssociationProperties;
    }

    override public function getRequiredProperties():Array
    {
         return model_internal::allRequiredProperties;   
    }

    override public function getDataProperties():Array
    {
        return model_internal::dataProperties;
    }

    public function getSourceProperties():Array
    {
        return model_internal::sourceProperties;
    }

    public function getNonDerivedProperties():Array
    {
        return model_internal::nonDerivedProperties;
    }

    override public function getGuardedProperties():Array
    {
        return model_internal::guardedProperties;
    }

    override public function getUnguardedProperties():Array
    {
        return model_internal::allAlwaysAvailableProperties;
    }

    override public function getDependants(propertyName:String):Array
    {
       if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a data property of entity GuiTransactionDetails");
            
       return model_internal::dependentsOnMap[propertyName] as Array;  
    }

    override public function getDependedOnServices():Array
    {
        return model_internal::dependedOnServices;
    }

    override public function getCollectionProperties():Array
    {
        return model_internal::collectionProperties;
    }

    override public function getCollectionBase(propertyName:String):String
    {
        if (model_internal::collectionProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a collection property of entity GuiTransactionDetails");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GuiTransactionDetails");

        return model_internal::propertyTypeMap[propertyName];
    }

    override public function getAvailableProperties():com.adobe.fiber.valueobjects.IPropertyIterator
    {
        return new com.adobe.fiber.valueobjects.AvailablePropertyIterator(this);
    }

    override public function getValue(propertyName:String):*
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " does not exist for entity GuiTransactionDetails");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GuiTransactionDetails");
        }

        model_internal::_instance[propertyName] = value;
    }

    override public function getMappedByProperty(associationProperty:String):String
    {
        switch(associationProperty)
        {
            default:
            {
                return null;
            }
        }
    }

    override public function getPropertyLength(propertyName:String):int
    {
        switch(propertyName)
        {
            default:
            {
                return 0;
            }
        }
    }

    override public function isAvailable(propertyName:String):Boolean
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " does not exist for entity GuiTransactionDetails");
        }

        if (model_internal::allAlwaysAvailableProperties.indexOf(propertyName) != -1)
        {
            return true;
        }

        switch(propertyName)
        {
            default:
            {
                return true;
            }
        }
    }

    override public function getIdentityMap():Object
    {
        var returnMap:Object = new Object();

        return returnMap;
    }

    [Bindable(event="propertyChange")]
    override public function get invalidConstraints():Array
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_invalidConstraints;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_invalidConstraints;        
        }
    }

    [Bindable(event="propertyChange")]
    override public function get validationFailureMessages():Array
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_validationFailureMessages;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_validationFailureMessages;
        }
    }

    override public function getDependantInvalidConstraints(propertyName:String):Array
    {
        var dependants:Array = getDependants(propertyName);
        if (dependants.length == 0)
        {
            return emptyArray;
        }

        var currentlyInvalid:Array = invalidConstraints;
        if (currentlyInvalid.length == 0)
        {
            return emptyArray;
        }

        var filterFunc:Function = function(element:*, index:int, arr:Array):Boolean
        {
            return dependants.indexOf(element) > -1;
        }

        return currentlyInvalid.filter(filterFunc);
    }

    /**
     * isValid
     */
    [Bindable(event="propertyChange")] 
    public function get isValid() : Boolean
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_isValid;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_isValid;
        }
    }

    [Bindable(event="propertyChange")]
    public function get isTrsfprod_prodcodeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_qty_ambAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_tempAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_qty_corAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_trailercompAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_baa_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBaa_bay_seqAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_load_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_qty_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_densityAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsftrid_trsa_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTrsfprod_prodcode():void
    {
        if (model_internal::_trsfprod_prodcodeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsfprod_prodcode = null;
            model_internal::calculateTrsfprod_prodcodeIsValid();
        }
    }
    public function invalidateDependentOnTrsf_qty_amb():void
    {
        if (model_internal::_trsf_qty_ambIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_qty_amb = null;
            model_internal::calculateTrsf_qty_ambIsValid();
        }
    }
    public function invalidateDependentOnTrsf_temp():void
    {
        if (model_internal::_trsf_tempIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_temp = null;
            model_internal::calculateTrsf_tempIsValid();
        }
    }
    public function invalidateDependentOnTrsf_qty_cor():void
    {
        if (model_internal::_trsf_qty_corIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_qty_cor = null;
            model_internal::calculateTrsf_qty_corIsValid();
        }
    }
    public function invalidateDependentOnEqpt_code():void
    {
        if (model_internal::_eqpt_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_code = null;
            model_internal::calculateEqpt_codeIsValid();
        }
    }
    public function invalidateDependentOnTrsf_trailercomp():void
    {
        if (model_internal::_trsf_trailercompIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_trailercomp = null;
            model_internal::calculateTrsf_trailercompIsValid();
        }
    }
    public function invalidateDependentOnTrsf_baa_code():void
    {
        if (model_internal::_trsf_baa_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_baa_code = null;
            model_internal::calculateTrsf_baa_codeIsValid();
        }
    }
    public function invalidateDependentOnBaa_bay_seq():void
    {
        if (model_internal::_baa_bay_seqIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBaa_bay_seq = null;
            model_internal::calculateBaa_bay_seqIsValid();
        }
    }
    public function invalidateDependentOnTrsf_load_kg():void
    {
        if (model_internal::_trsf_load_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_load_kg = null;
            model_internal::calculateTrsf_load_kgIsValid();
        }
    }
    public function invalidateDependentOnTrsf_id():void
    {
        if (model_internal::_trsf_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_id = null;
            model_internal::calculateTrsf_idIsValid();
        }
    }
    public function invalidateDependentOnTrsf_qty_kg():void
    {
        if (model_internal::_trsf_qty_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_qty_kg = null;
            model_internal::calculateTrsf_qty_kgIsValid();
        }
    }
    public function invalidateDependentOnTrsf_density():void
    {
        if (model_internal::_trsf_densityIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_density = null;
            model_internal::calculateTrsf_densityIsValid();
        }
    }
    public function invalidateDependentOnTrsftrid_trsa_id():void
    {
        if (model_internal::_trsftrid_trsa_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsftrid_trsa_id = null;
            model_internal::calculateTrsftrid_trsa_idIsValid();
        }
    }
    public function invalidateDependentOnProd_name():void
    {
        if (model_internal::_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_name = null;
            model_internal::calculateProd_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get trsfprod_prodcodeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsfprod_prodcodeValidator() : StyleValidator
    {
        return model_internal::_trsfprod_prodcodeValidator;
    }

    model_internal function set _trsfprod_prodcodeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsfprod_prodcodeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsfprod_prodcodeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsfprod_prodcodeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsfprod_prodcodeIsValid():Boolean
    {
        if (!model_internal::_trsfprod_prodcodeIsValidCacheInitialized)
        {
            model_internal::calculateTrsfprod_prodcodeIsValid();
        }

        return model_internal::_trsfprod_prodcodeIsValid;
    }

    model_internal function calculateTrsfprod_prodcodeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsfprod_prodcodeValidator.validate(model_internal::_instance.trsfprod_prodcode)
        model_internal::_trsfprod_prodcodeIsValid_der = (valRes.results == null);
        model_internal::_trsfprod_prodcodeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsfprod_prodcodeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsfprod_prodcodeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsfprod_prodcodeValidationFailureMessages():Array
    {
        if (model_internal::_trsfprod_prodcodeValidationFailureMessages == null)
            model_internal::calculateTrsfprod_prodcodeIsValid();

        return _trsfprod_prodcodeValidationFailureMessages;
    }

    model_internal function set trsfprod_prodcodeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsfprod_prodcodeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsfprod_prodcodeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsfprod_prodcodeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_qty_ambStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_qty_ambValidator() : StyleValidator
    {
        return model_internal::_trsf_qty_ambValidator;
    }

    model_internal function set _trsf_qty_ambIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_qty_ambIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_qty_ambIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_ambIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_ambIsValid():Boolean
    {
        if (!model_internal::_trsf_qty_ambIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_qty_ambIsValid();
        }

        return model_internal::_trsf_qty_ambIsValid;
    }

    model_internal function calculateTrsf_qty_ambIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_qty_ambValidator.validate(model_internal::_instance.trsf_qty_amb)
        model_internal::_trsf_qty_ambIsValid_der = (valRes.results == null);
        model_internal::_trsf_qty_ambIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_qty_ambValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_qty_ambValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_ambValidationFailureMessages():Array
    {
        if (model_internal::_trsf_qty_ambValidationFailureMessages == null)
            model_internal::calculateTrsf_qty_ambIsValid();

        return _trsf_qty_ambValidationFailureMessages;
    }

    model_internal function set trsf_qty_ambValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_qty_ambValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_qty_ambValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_ambValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_tempStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_tempValidator() : StyleValidator
    {
        return model_internal::_trsf_tempValidator;
    }

    model_internal function set _trsf_tempIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_tempIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_tempIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_tempIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_tempIsValid():Boolean
    {
        if (!model_internal::_trsf_tempIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_tempIsValid();
        }

        return model_internal::_trsf_tempIsValid;
    }

    model_internal function calculateTrsf_tempIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_tempValidator.validate(model_internal::_instance.trsf_temp)
        model_internal::_trsf_tempIsValid_der = (valRes.results == null);
        model_internal::_trsf_tempIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_tempValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_tempValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_tempValidationFailureMessages():Array
    {
        if (model_internal::_trsf_tempValidationFailureMessages == null)
            model_internal::calculateTrsf_tempIsValid();

        return _trsf_tempValidationFailureMessages;
    }

    model_internal function set trsf_tempValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_tempValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_tempValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_tempValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_qty_corStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_qty_corValidator() : StyleValidator
    {
        return model_internal::_trsf_qty_corValidator;
    }

    model_internal function set _trsf_qty_corIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_qty_corIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_qty_corIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_corIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_corIsValid():Boolean
    {
        if (!model_internal::_trsf_qty_corIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_qty_corIsValid();
        }

        return model_internal::_trsf_qty_corIsValid;
    }

    model_internal function calculateTrsf_qty_corIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_qty_corValidator.validate(model_internal::_instance.trsf_qty_cor)
        model_internal::_trsf_qty_corIsValid_der = (valRes.results == null);
        model_internal::_trsf_qty_corIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_qty_corValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_qty_corValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_corValidationFailureMessages():Array
    {
        if (model_internal::_trsf_qty_corValidationFailureMessages == null)
            model_internal::calculateTrsf_qty_corIsValid();

        return _trsf_qty_corValidationFailureMessages;
    }

    model_internal function set trsf_qty_corValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_qty_corValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_qty_corValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_corValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_codeValidator() : StyleValidator
    {
        return model_internal::_eqpt_codeValidator;
    }

    model_internal function set _eqpt_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_codeIsValid():Boolean
    {
        if (!model_internal::_eqpt_codeIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_codeIsValid();
        }

        return model_internal::_eqpt_codeIsValid;
    }

    model_internal function calculateEqpt_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_codeValidator.validate(model_internal::_instance.eqpt_code)
        model_internal::_eqpt_codeIsValid_der = (valRes.results == null);
        model_internal::_eqpt_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_codeValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_codeValidationFailureMessages == null)
            model_internal::calculateEqpt_codeIsValid();

        return _eqpt_codeValidationFailureMessages;
    }

    model_internal function set eqpt_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_codeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_eqpt_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_trailercompStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_trailercompValidator() : StyleValidator
    {
        return model_internal::_trsf_trailercompValidator;
    }

    model_internal function set _trsf_trailercompIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_trailercompIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_trailercompIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_trailercompIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_trailercompIsValid():Boolean
    {
        if (!model_internal::_trsf_trailercompIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_trailercompIsValid();
        }

        return model_internal::_trsf_trailercompIsValid;
    }

    model_internal function calculateTrsf_trailercompIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_trailercompValidator.validate(model_internal::_instance.trsf_trailercomp)
        model_internal::_trsf_trailercompIsValid_der = (valRes.results == null);
        model_internal::_trsf_trailercompIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_trailercompValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_trailercompValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_trailercompValidationFailureMessages():Array
    {
        if (model_internal::_trsf_trailercompValidationFailureMessages == null)
            model_internal::calculateTrsf_trailercompIsValid();

        return _trsf_trailercompValidationFailureMessages;
    }

    model_internal function set trsf_trailercompValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_trailercompValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_trailercompValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_trailercompValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_baa_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_baa_codeValidator() : StyleValidator
    {
        return model_internal::_trsf_baa_codeValidator;
    }

    model_internal function set _trsf_baa_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_baa_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_baa_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_baa_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_baa_codeIsValid():Boolean
    {
        if (!model_internal::_trsf_baa_codeIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_baa_codeIsValid();
        }

        return model_internal::_trsf_baa_codeIsValid;
    }

    model_internal function calculateTrsf_baa_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_baa_codeValidator.validate(model_internal::_instance.trsf_baa_code)
        model_internal::_trsf_baa_codeIsValid_der = (valRes.results == null);
        model_internal::_trsf_baa_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_baa_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_baa_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_baa_codeValidationFailureMessages():Array
    {
        if (model_internal::_trsf_baa_codeValidationFailureMessages == null)
            model_internal::calculateTrsf_baa_codeIsValid();

        return _trsf_baa_codeValidationFailureMessages;
    }

    model_internal function set trsf_baa_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_baa_codeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_baa_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_baa_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get baa_bay_seqStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get baa_bay_seqValidator() : StyleValidator
    {
        return model_internal::_baa_bay_seqValidator;
    }

    model_internal function set _baa_bay_seqIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_baa_bay_seqIsValid;         
        if (oldValue !== value)
        {
            model_internal::_baa_bay_seqIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "baa_bay_seqIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get baa_bay_seqIsValid():Boolean
    {
        if (!model_internal::_baa_bay_seqIsValidCacheInitialized)
        {
            model_internal::calculateBaa_bay_seqIsValid();
        }

        return model_internal::_baa_bay_seqIsValid;
    }

    model_internal function calculateBaa_bay_seqIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_baa_bay_seqValidator.validate(model_internal::_instance.baa_bay_seq)
        model_internal::_baa_bay_seqIsValid_der = (valRes.results == null);
        model_internal::_baa_bay_seqIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::baa_bay_seqValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::baa_bay_seqValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get baa_bay_seqValidationFailureMessages():Array
    {
        if (model_internal::_baa_bay_seqValidationFailureMessages == null)
            model_internal::calculateBaa_bay_seqIsValid();

        return _baa_bay_seqValidationFailureMessages;
    }

    model_internal function set baa_bay_seqValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_baa_bay_seqValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_baa_bay_seqValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "baa_bay_seqValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_load_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_load_kgValidator() : StyleValidator
    {
        return model_internal::_trsf_load_kgValidator;
    }

    model_internal function set _trsf_load_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_load_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_load_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_load_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_load_kgIsValid():Boolean
    {
        if (!model_internal::_trsf_load_kgIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_load_kgIsValid();
        }

        return model_internal::_trsf_load_kgIsValid;
    }

    model_internal function calculateTrsf_load_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_load_kgValidator.validate(model_internal::_instance.trsf_load_kg)
        model_internal::_trsf_load_kgIsValid_der = (valRes.results == null);
        model_internal::_trsf_load_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_load_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_load_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_load_kgValidationFailureMessages():Array
    {
        if (model_internal::_trsf_load_kgValidationFailureMessages == null)
            model_internal::calculateTrsf_load_kgIsValid();

        return _trsf_load_kgValidationFailureMessages;
    }

    model_internal function set trsf_load_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_load_kgValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_load_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_load_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_idValidator() : StyleValidator
    {
        return model_internal::_trsf_idValidator;
    }

    model_internal function set _trsf_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_idIsValid():Boolean
    {
        if (!model_internal::_trsf_idIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_idIsValid();
        }

        return model_internal::_trsf_idIsValid;
    }

    model_internal function calculateTrsf_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_idValidator.validate(model_internal::_instance.trsf_id)
        model_internal::_trsf_idIsValid_der = (valRes.results == null);
        model_internal::_trsf_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_idValidationFailureMessages():Array
    {
        if (model_internal::_trsf_idValidationFailureMessages == null)
            model_internal::calculateTrsf_idIsValid();

        return _trsf_idValidationFailureMessages;
    }

    model_internal function set trsf_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_idValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_qty_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_qty_kgValidator() : StyleValidator
    {
        return model_internal::_trsf_qty_kgValidator;
    }

    model_internal function set _trsf_qty_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_qty_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_qty_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_kgIsValid():Boolean
    {
        if (!model_internal::_trsf_qty_kgIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_qty_kgIsValid();
        }

        return model_internal::_trsf_qty_kgIsValid;
    }

    model_internal function calculateTrsf_qty_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_qty_kgValidator.validate(model_internal::_instance.trsf_qty_kg)
        model_internal::_trsf_qty_kgIsValid_der = (valRes.results == null);
        model_internal::_trsf_qty_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_qty_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_qty_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_kgValidationFailureMessages():Array
    {
        if (model_internal::_trsf_qty_kgValidationFailureMessages == null)
            model_internal::calculateTrsf_qty_kgIsValid();

        return _trsf_qty_kgValidationFailureMessages;
    }

    model_internal function set trsf_qty_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_qty_kgValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_qty_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_densityStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_densityValidator() : StyleValidator
    {
        return model_internal::_trsf_densityValidator;
    }

    model_internal function set _trsf_densityIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_densityIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_densityIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_densityIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_densityIsValid():Boolean
    {
        if (!model_internal::_trsf_densityIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_densityIsValid();
        }

        return model_internal::_trsf_densityIsValid;
    }

    model_internal function calculateTrsf_densityIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_densityValidator.validate(model_internal::_instance.trsf_density)
        model_internal::_trsf_densityIsValid_der = (valRes.results == null);
        model_internal::_trsf_densityIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_densityValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_densityValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_densityValidationFailureMessages():Array
    {
        if (model_internal::_trsf_densityValidationFailureMessages == null)
            model_internal::calculateTrsf_densityIsValid();

        return _trsf_densityValidationFailureMessages;
    }

    model_internal function set trsf_densityValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_densityValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_densityValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_densityValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsftrid_trsa_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsftrid_trsa_idValidator() : StyleValidator
    {
        return model_internal::_trsftrid_trsa_idValidator;
    }

    model_internal function set _trsftrid_trsa_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsftrid_trsa_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsftrid_trsa_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsftrid_trsa_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsftrid_trsa_idIsValid():Boolean
    {
        if (!model_internal::_trsftrid_trsa_idIsValidCacheInitialized)
        {
            model_internal::calculateTrsftrid_trsa_idIsValid();
        }

        return model_internal::_trsftrid_trsa_idIsValid;
    }

    model_internal function calculateTrsftrid_trsa_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsftrid_trsa_idValidator.validate(model_internal::_instance.trsftrid_trsa_id)
        model_internal::_trsftrid_trsa_idIsValid_der = (valRes.results == null);
        model_internal::_trsftrid_trsa_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsftrid_trsa_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsftrid_trsa_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsftrid_trsa_idValidationFailureMessages():Array
    {
        if (model_internal::_trsftrid_trsa_idValidationFailureMessages == null)
            model_internal::calculateTrsftrid_trsa_idIsValid();

        return _trsftrid_trsa_idValidationFailureMessages;
    }

    model_internal function set trsftrid_trsa_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsftrid_trsa_idValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsftrid_trsa_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsftrid_trsa_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_nameValidator() : StyleValidator
    {
        return model_internal::_prod_nameValidator;
    }

    model_internal function set _prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameIsValid():Boolean
    {
        if (!model_internal::_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateProd_nameIsValid();
        }

        return model_internal::_prod_nameIsValid;
    }

    model_internal function calculateProd_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_nameValidator.validate(model_internal::_instance.prod_name)
        model_internal::_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_prod_nameValidationFailureMessages == null)
            model_internal::calculateProd_nameIsValid();

        return _prod_nameValidationFailureMessages;
    }

    model_internal function set prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_nameValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }


     /**
     * 
     * @inheritDoc 
     */ 
     override public function getStyle(propertyName:String):com.adobe.fiber.styles.IStyle
     {
         switch(propertyName)
         {
            default:
            {
                return null;
            }
         }
     }
     
     /**
     * 
     * @inheritDoc 
     *  
     */  
     override public function getPropertyValidationFailureMessages(propertyName:String):Array
     {
         switch(propertyName)
         {
            case("trsfprod_prodcode"):
            {
                return trsfprod_prodcodeValidationFailureMessages;
            }
            case("trsf_qty_amb"):
            {
                return trsf_qty_ambValidationFailureMessages;
            }
            case("trsf_temp"):
            {
                return trsf_tempValidationFailureMessages;
            }
            case("trsf_qty_cor"):
            {
                return trsf_qty_corValidationFailureMessages;
            }
            case("eqpt_code"):
            {
                return eqpt_codeValidationFailureMessages;
            }
            case("trsf_trailercomp"):
            {
                return trsf_trailercompValidationFailureMessages;
            }
            case("trsf_baa_code"):
            {
                return trsf_baa_codeValidationFailureMessages;
            }
            case("baa_bay_seq"):
            {
                return baa_bay_seqValidationFailureMessages;
            }
            case("trsf_load_kg"):
            {
                return trsf_load_kgValidationFailureMessages;
            }
            case("trsf_id"):
            {
                return trsf_idValidationFailureMessages;
            }
            case("trsf_qty_kg"):
            {
                return trsf_qty_kgValidationFailureMessages;
            }
            case("trsf_density"):
            {
                return trsf_densityValidationFailureMessages;
            }
            case("trsftrid_trsa_id"):
            {
                return trsftrid_trsa_idValidationFailureMessages;
            }
            case("prod_name"):
            {
                return prod_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
