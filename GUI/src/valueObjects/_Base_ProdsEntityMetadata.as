
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
internal class _Base_ProdsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("base_pub_dens_std", "bclass_desc", "last_upd_time", "base_cat", "bclass_dens_hi", "base_pub_temp", "base_real_vcf", "base_code", "bclass_vcf_alg", "base_compensate_priority", "base_compensate_mode", "base_real_dens", "pgr_description", "pgr_unit", "base_pub_vcf", "base_prod_group", "base_real_dens_std", "base_rpt_temp", "base_pub_dens", "base_real_temp", "base_name", "base_rpt_tunt", "bclass_dens_lo");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("base_pub_dens_std", "bclass_desc", "last_upd_time", "base_cat", "bclass_dens_hi", "base_pub_temp", "base_real_vcf", "base_code", "bclass_vcf_alg", "base_compensate_priority", "base_compensate_mode", "base_real_dens", "pgr_description", "pgr_unit", "base_pub_vcf", "base_prod_group", "base_real_dens_std", "base_rpt_temp", "base_pub_dens", "base_real_temp", "base_name", "base_rpt_tunt", "bclass_dens_lo");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("base_pub_dens_std", "bclass_desc", "last_upd_time", "base_cat", "bclass_dens_hi", "base_pub_temp", "base_real_vcf", "base_code", "bclass_vcf_alg", "base_compensate_priority", "base_compensate_mode", "base_real_dens", "pgr_description", "pgr_unit", "base_pub_vcf", "base_prod_group", "base_real_dens_std", "base_rpt_temp", "base_pub_dens", "base_real_temp", "base_name", "base_rpt_tunt", "bclass_dens_lo");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("base_pub_dens_std", "bclass_desc", "last_upd_time", "base_cat", "bclass_dens_hi", "base_pub_temp", "base_real_vcf", "base_code", "bclass_vcf_alg", "base_compensate_priority", "base_compensate_mode", "base_real_dens", "pgr_description", "pgr_unit", "base_pub_vcf", "base_prod_group", "base_real_dens_std", "base_rpt_temp", "base_pub_dens", "base_real_temp", "base_name", "base_rpt_tunt", "bclass_dens_lo");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("base_pub_dens_std", "bclass_desc", "last_upd_time", "base_cat", "bclass_dens_hi", "base_pub_temp", "base_real_vcf", "base_code", "bclass_vcf_alg", "base_compensate_priority", "base_compensate_mode", "base_real_dens", "pgr_description", "pgr_unit", "base_pub_vcf", "base_prod_group", "base_real_dens_std", "base_rpt_temp", "base_pub_dens", "base_real_temp", "base_name", "base_rpt_tunt", "bclass_dens_lo");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Base_Prods";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _base_pub_dens_stdIsValid:Boolean;
    model_internal var _base_pub_dens_stdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_pub_dens_stdIsValidCacheInitialized:Boolean = false;
    model_internal var _base_pub_dens_stdValidationFailureMessages:Array;
    
    model_internal var _bclass_descIsValid:Boolean;
    model_internal var _bclass_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_descIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_descValidationFailureMessages:Array;
    
    model_internal var _last_upd_timeIsValid:Boolean;
    model_internal var _last_upd_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _last_upd_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _last_upd_timeValidationFailureMessages:Array;
    
    model_internal var _base_catIsValid:Boolean;
    model_internal var _base_catValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_catIsValidCacheInitialized:Boolean = false;
    model_internal var _base_catValidationFailureMessages:Array;
    
    model_internal var _bclass_dens_hiIsValid:Boolean;
    model_internal var _bclass_dens_hiValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_dens_hiIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_dens_hiValidationFailureMessages:Array;
    
    model_internal var _base_pub_tempIsValid:Boolean;
    model_internal var _base_pub_tempValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_pub_tempIsValidCacheInitialized:Boolean = false;
    model_internal var _base_pub_tempValidationFailureMessages:Array;
    
    model_internal var _base_real_vcfIsValid:Boolean;
    model_internal var _base_real_vcfValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_real_vcfIsValidCacheInitialized:Boolean = false;
    model_internal var _base_real_vcfValidationFailureMessages:Array;
    
    model_internal var _bclass_vcf_algIsValid:Boolean;
    model_internal var _bclass_vcf_algValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_vcf_algIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_vcf_algValidationFailureMessages:Array;
    
    model_internal var _base_compensate_priorityIsValid:Boolean;
    model_internal var _base_compensate_priorityValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_compensate_priorityIsValidCacheInitialized:Boolean = false;
    model_internal var _base_compensate_priorityValidationFailureMessages:Array;
    
    model_internal var _base_compensate_modeIsValid:Boolean;
    model_internal var _base_compensate_modeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_compensate_modeIsValidCacheInitialized:Boolean = false;
    model_internal var _base_compensate_modeValidationFailureMessages:Array;
    
    model_internal var _base_real_densIsValid:Boolean;
    model_internal var _base_real_densValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_real_densIsValidCacheInitialized:Boolean = false;
    model_internal var _base_real_densValidationFailureMessages:Array;
    
    model_internal var _pgr_descriptionIsValid:Boolean;
    model_internal var _pgr_descriptionValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _pgr_descriptionIsValidCacheInitialized:Boolean = false;
    model_internal var _pgr_descriptionValidationFailureMessages:Array;
    
    model_internal var _pgr_unitIsValid:Boolean;
    model_internal var _pgr_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _pgr_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _pgr_unitValidationFailureMessages:Array;
    
    model_internal var _base_pub_vcfIsValid:Boolean;
    model_internal var _base_pub_vcfValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_pub_vcfIsValidCacheInitialized:Boolean = false;
    model_internal var _base_pub_vcfValidationFailureMessages:Array;
    
    model_internal var _base_prod_groupIsValid:Boolean;
    model_internal var _base_prod_groupValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_prod_groupIsValidCacheInitialized:Boolean = false;
    model_internal var _base_prod_groupValidationFailureMessages:Array;
    
    model_internal var _base_real_dens_stdIsValid:Boolean;
    model_internal var _base_real_dens_stdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_real_dens_stdIsValidCacheInitialized:Boolean = false;
    model_internal var _base_real_dens_stdValidationFailureMessages:Array;
    
    model_internal var _base_rpt_tempIsValid:Boolean;
    model_internal var _base_rpt_tempValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_rpt_tempIsValidCacheInitialized:Boolean = false;
    model_internal var _base_rpt_tempValidationFailureMessages:Array;
    
    model_internal var _base_pub_densIsValid:Boolean;
    model_internal var _base_pub_densValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_pub_densIsValidCacheInitialized:Boolean = false;
    model_internal var _base_pub_densValidationFailureMessages:Array;
    
    model_internal var _base_real_tempIsValid:Boolean;
    model_internal var _base_real_tempValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_real_tempIsValidCacheInitialized:Boolean = false;
    model_internal var _base_real_tempValidationFailureMessages:Array;
    
    model_internal var _base_nameIsValid:Boolean;
    model_internal var _base_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _base_nameValidationFailureMessages:Array;
    
    model_internal var _base_rpt_tuntIsValid:Boolean;
    model_internal var _base_rpt_tuntValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_rpt_tuntIsValidCacheInitialized:Boolean = false;
    model_internal var _base_rpt_tuntValidationFailureMessages:Array;
    
    model_internal var _bclass_dens_loIsValid:Boolean;
    model_internal var _bclass_dens_loValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_dens_loIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_dens_loValidationFailureMessages:Array;

    model_internal var _instance:_Super_Base_Prods;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _Base_ProdsEntityMetadata(value : _Super_Base_Prods)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["base_pub_dens_std"] = new Array();
            model_internal::dependentsOnMap["bclass_desc"] = new Array();
            model_internal::dependentsOnMap["last_upd_time"] = new Array();
            model_internal::dependentsOnMap["base_cat"] = new Array();
            model_internal::dependentsOnMap["bclass_dens_hi"] = new Array();
            model_internal::dependentsOnMap["base_pub_temp"] = new Array();
            model_internal::dependentsOnMap["base_real_vcf"] = new Array();
            model_internal::dependentsOnMap["base_code"] = new Array();
            model_internal::dependentsOnMap["bclass_vcf_alg"] = new Array();
            model_internal::dependentsOnMap["base_compensate_priority"] = new Array();
            model_internal::dependentsOnMap["base_compensate_mode"] = new Array();
            model_internal::dependentsOnMap["base_real_dens"] = new Array();
            model_internal::dependentsOnMap["pgr_description"] = new Array();
            model_internal::dependentsOnMap["pgr_unit"] = new Array();
            model_internal::dependentsOnMap["base_pub_vcf"] = new Array();
            model_internal::dependentsOnMap["base_prod_group"] = new Array();
            model_internal::dependentsOnMap["base_real_dens_std"] = new Array();
            model_internal::dependentsOnMap["base_rpt_temp"] = new Array();
            model_internal::dependentsOnMap["base_pub_dens"] = new Array();
            model_internal::dependentsOnMap["base_real_temp"] = new Array();
            model_internal::dependentsOnMap["base_name"] = new Array();
            model_internal::dependentsOnMap["base_rpt_tunt"] = new Array();
            model_internal::dependentsOnMap["bclass_dens_lo"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["base_pub_dens_std"] = "Object";
        model_internal::propertyTypeMap["bclass_desc"] = "Object";
        model_internal::propertyTypeMap["last_upd_time"] = "String";
        model_internal::propertyTypeMap["base_cat"] = "String";
        model_internal::propertyTypeMap["bclass_dens_hi"] = "Object";
        model_internal::propertyTypeMap["base_pub_temp"] = "Object";
        model_internal::propertyTypeMap["base_real_vcf"] = "Object";
        model_internal::propertyTypeMap["base_code"] = "String";
        model_internal::propertyTypeMap["bclass_vcf_alg"] = "Object";
        model_internal::propertyTypeMap["base_compensate_priority"] = "Object";
        model_internal::propertyTypeMap["base_compensate_mode"] = "Object";
        model_internal::propertyTypeMap["base_real_dens"] = "Object";
        model_internal::propertyTypeMap["pgr_description"] = "Object";
        model_internal::propertyTypeMap["pgr_unit"] = "Object";
        model_internal::propertyTypeMap["base_pub_vcf"] = "Object";
        model_internal::propertyTypeMap["base_prod_group"] = "String";
        model_internal::propertyTypeMap["base_real_dens_std"] = "Object";
        model_internal::propertyTypeMap["base_rpt_temp"] = "Object";
        model_internal::propertyTypeMap["base_pub_dens"] = "Object";
        model_internal::propertyTypeMap["base_real_temp"] = "Object";
        model_internal::propertyTypeMap["base_name"] = "String";
        model_internal::propertyTypeMap["base_rpt_tunt"] = "Object";
        model_internal::propertyTypeMap["bclass_dens_lo"] = "Object";

        model_internal::_instance = value;
        model_internal::_base_pub_dens_stdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_pub_dens_std);
        model_internal::_base_pub_dens_stdValidator.required = true;
        model_internal::_base_pub_dens_stdValidator.requiredFieldError = "base_pub_dens_std is required";
        //model_internal::_base_pub_dens_stdValidator.source = model_internal::_instance;
        //model_internal::_base_pub_dens_stdValidator.property = "base_pub_dens_std";
        model_internal::_bclass_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_desc);
        model_internal::_bclass_descValidator.required = true;
        model_internal::_bclass_descValidator.requiredFieldError = "bclass_desc is required";
        //model_internal::_bclass_descValidator.source = model_internal::_instance;
        //model_internal::_bclass_descValidator.property = "bclass_desc";
        model_internal::_last_upd_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLast_upd_time);
        model_internal::_last_upd_timeValidator.required = true;
        model_internal::_last_upd_timeValidator.requiredFieldError = "last_upd_time is required";
        //model_internal::_last_upd_timeValidator.source = model_internal::_instance;
        //model_internal::_last_upd_timeValidator.property = "last_upd_time";
        model_internal::_base_catValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_cat);
        model_internal::_base_catValidator.required = true;
        model_internal::_base_catValidator.requiredFieldError = "base_cat is required";
        //model_internal::_base_catValidator.source = model_internal::_instance;
        //model_internal::_base_catValidator.property = "base_cat";
        model_internal::_bclass_dens_hiValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_dens_hi);
        model_internal::_bclass_dens_hiValidator.required = true;
        model_internal::_bclass_dens_hiValidator.requiredFieldError = "bclass_dens_hi is required";
        //model_internal::_bclass_dens_hiValidator.source = model_internal::_instance;
        //model_internal::_bclass_dens_hiValidator.property = "bclass_dens_hi";
        model_internal::_base_pub_tempValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_pub_temp);
        model_internal::_base_pub_tempValidator.required = true;
        model_internal::_base_pub_tempValidator.requiredFieldError = "base_pub_temp is required";
        //model_internal::_base_pub_tempValidator.source = model_internal::_instance;
        //model_internal::_base_pub_tempValidator.property = "base_pub_temp";
        model_internal::_base_real_vcfValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_real_vcf);
        model_internal::_base_real_vcfValidator.required = true;
        model_internal::_base_real_vcfValidator.requiredFieldError = "base_real_vcf is required";
        //model_internal::_base_real_vcfValidator.source = model_internal::_instance;
        //model_internal::_base_real_vcfValidator.property = "base_real_vcf";
        model_internal::_bclass_vcf_algValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_vcf_alg);
        model_internal::_bclass_vcf_algValidator.required = true;
        model_internal::_bclass_vcf_algValidator.requiredFieldError = "bclass_vcf_alg is required";
        //model_internal::_bclass_vcf_algValidator.source = model_internal::_instance;
        //model_internal::_bclass_vcf_algValidator.property = "bclass_vcf_alg";
        model_internal::_base_compensate_priorityValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_compensate_priority);
        model_internal::_base_compensate_priorityValidator.required = true;
        model_internal::_base_compensate_priorityValidator.requiredFieldError = "base_compensate_priority is required";
        //model_internal::_base_compensate_priorityValidator.source = model_internal::_instance;
        //model_internal::_base_compensate_priorityValidator.property = "base_compensate_priority";
        model_internal::_base_compensate_modeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_compensate_mode);
        model_internal::_base_compensate_modeValidator.required = true;
        model_internal::_base_compensate_modeValidator.requiredFieldError = "base_compensate_mode is required";
        //model_internal::_base_compensate_modeValidator.source = model_internal::_instance;
        //model_internal::_base_compensate_modeValidator.property = "base_compensate_mode";
        model_internal::_base_real_densValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_real_dens);
        model_internal::_base_real_densValidator.required = true;
        model_internal::_base_real_densValidator.requiredFieldError = "base_real_dens is required";
        //model_internal::_base_real_densValidator.source = model_internal::_instance;
        //model_internal::_base_real_densValidator.property = "base_real_dens";
        model_internal::_pgr_descriptionValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPgr_description);
        model_internal::_pgr_descriptionValidator.required = true;
        model_internal::_pgr_descriptionValidator.requiredFieldError = "pgr_description is required";
        //model_internal::_pgr_descriptionValidator.source = model_internal::_instance;
        //model_internal::_pgr_descriptionValidator.property = "pgr_description";
        model_internal::_pgr_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPgr_unit);
        model_internal::_pgr_unitValidator.required = true;
        model_internal::_pgr_unitValidator.requiredFieldError = "pgr_unit is required";
        //model_internal::_pgr_unitValidator.source = model_internal::_instance;
        //model_internal::_pgr_unitValidator.property = "pgr_unit";
        model_internal::_base_pub_vcfValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_pub_vcf);
        model_internal::_base_pub_vcfValidator.required = true;
        model_internal::_base_pub_vcfValidator.requiredFieldError = "base_pub_vcf is required";
        //model_internal::_base_pub_vcfValidator.source = model_internal::_instance;
        //model_internal::_base_pub_vcfValidator.property = "base_pub_vcf";
        model_internal::_base_prod_groupValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_prod_group);
        model_internal::_base_prod_groupValidator.required = true;
        model_internal::_base_prod_groupValidator.requiredFieldError = "base_prod_group is required";
        //model_internal::_base_prod_groupValidator.source = model_internal::_instance;
        //model_internal::_base_prod_groupValidator.property = "base_prod_group";
        model_internal::_base_real_dens_stdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_real_dens_std);
        model_internal::_base_real_dens_stdValidator.required = true;
        model_internal::_base_real_dens_stdValidator.requiredFieldError = "base_real_dens_std is required";
        //model_internal::_base_real_dens_stdValidator.source = model_internal::_instance;
        //model_internal::_base_real_dens_stdValidator.property = "base_real_dens_std";
        model_internal::_base_rpt_tempValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_rpt_temp);
        model_internal::_base_rpt_tempValidator.required = true;
        model_internal::_base_rpt_tempValidator.requiredFieldError = "base_rpt_temp is required";
        //model_internal::_base_rpt_tempValidator.source = model_internal::_instance;
        //model_internal::_base_rpt_tempValidator.property = "base_rpt_temp";
        model_internal::_base_pub_densValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_pub_dens);
        model_internal::_base_pub_densValidator.required = true;
        model_internal::_base_pub_densValidator.requiredFieldError = "base_pub_dens is required";
        //model_internal::_base_pub_densValidator.source = model_internal::_instance;
        //model_internal::_base_pub_densValidator.property = "base_pub_dens";
        model_internal::_base_real_tempValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_real_temp);
        model_internal::_base_real_tempValidator.required = true;
        model_internal::_base_real_tempValidator.requiredFieldError = "base_real_temp is required";
        //model_internal::_base_real_tempValidator.source = model_internal::_instance;
        //model_internal::_base_real_tempValidator.property = "base_real_temp";
        model_internal::_base_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_name);
        model_internal::_base_nameValidator.required = true;
        model_internal::_base_nameValidator.requiredFieldError = "base_name is required";
        //model_internal::_base_nameValidator.source = model_internal::_instance;
        //model_internal::_base_nameValidator.property = "base_name";
        model_internal::_base_rpt_tuntValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_rpt_tunt);
        model_internal::_base_rpt_tuntValidator.required = true;
        model_internal::_base_rpt_tuntValidator.requiredFieldError = "base_rpt_tunt is required";
        //model_internal::_base_rpt_tuntValidator.source = model_internal::_instance;
        //model_internal::_base_rpt_tuntValidator.property = "base_rpt_tunt";
        model_internal::_bclass_dens_loValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_dens_lo);
        model_internal::_bclass_dens_loValidator.required = true;
        model_internal::_bclass_dens_loValidator.requiredFieldError = "bclass_dens_lo is required";
        //model_internal::_bclass_dens_loValidator.source = model_internal::_instance;
        //model_internal::_bclass_dens_loValidator.property = "bclass_dens_lo";
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
            throw new Error(propertyName + " is not a data property of entity Base_Prods");
            
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
            throw new Error(propertyName + " is not a collection property of entity Base_Prods");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Base_Prods");

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
            throw new Error(propertyName + " does not exist for entity Base_Prods");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Base_Prods");
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
            throw new Error(propertyName + " does not exist for entity Base_Prods");
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
        returnMap["base_code"] = model_internal::_instance.base_code;

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
    public function get isBase_pub_dens_stdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLast_upd_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_catAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_dens_hiAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_pub_tempAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_real_vcfAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_vcf_algAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_compensate_priorityAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_compensate_modeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_real_densAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPgr_descriptionAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPgr_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_pub_vcfAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_prod_groupAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_real_dens_stdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_rpt_tempAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_pub_densAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_real_tempAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBase_rpt_tuntAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_dens_loAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnBase_pub_dens_std():void
    {
        if (model_internal::_base_pub_dens_stdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_pub_dens_std = null;
            model_internal::calculateBase_pub_dens_stdIsValid();
        }
    }
    public function invalidateDependentOnBclass_desc():void
    {
        if (model_internal::_bclass_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_desc = null;
            model_internal::calculateBclass_descIsValid();
        }
    }
    public function invalidateDependentOnLast_upd_time():void
    {
        if (model_internal::_last_upd_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLast_upd_time = null;
            model_internal::calculateLast_upd_timeIsValid();
        }
    }
    public function invalidateDependentOnBase_cat():void
    {
        if (model_internal::_base_catIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_cat = null;
            model_internal::calculateBase_catIsValid();
        }
    }
    public function invalidateDependentOnBclass_dens_hi():void
    {
        if (model_internal::_bclass_dens_hiIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_dens_hi = null;
            model_internal::calculateBclass_dens_hiIsValid();
        }
    }
    public function invalidateDependentOnBase_pub_temp():void
    {
        if (model_internal::_base_pub_tempIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_pub_temp = null;
            model_internal::calculateBase_pub_tempIsValid();
        }
    }
    public function invalidateDependentOnBase_real_vcf():void
    {
        if (model_internal::_base_real_vcfIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_real_vcf = null;
            model_internal::calculateBase_real_vcfIsValid();
        }
    }
    public function invalidateDependentOnBclass_vcf_alg():void
    {
        if (model_internal::_bclass_vcf_algIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_vcf_alg = null;
            model_internal::calculateBclass_vcf_algIsValid();
        }
    }
    public function invalidateDependentOnBase_compensate_priority():void
    {
        if (model_internal::_base_compensate_priorityIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_compensate_priority = null;
            model_internal::calculateBase_compensate_priorityIsValid();
        }
    }
    public function invalidateDependentOnBase_compensate_mode():void
    {
        if (model_internal::_base_compensate_modeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_compensate_mode = null;
            model_internal::calculateBase_compensate_modeIsValid();
        }
    }
    public function invalidateDependentOnBase_real_dens():void
    {
        if (model_internal::_base_real_densIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_real_dens = null;
            model_internal::calculateBase_real_densIsValid();
        }
    }
    public function invalidateDependentOnPgr_description():void
    {
        if (model_internal::_pgr_descriptionIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPgr_description = null;
            model_internal::calculatePgr_descriptionIsValid();
        }
    }
    public function invalidateDependentOnPgr_unit():void
    {
        if (model_internal::_pgr_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPgr_unit = null;
            model_internal::calculatePgr_unitIsValid();
        }
    }
    public function invalidateDependentOnBase_pub_vcf():void
    {
        if (model_internal::_base_pub_vcfIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_pub_vcf = null;
            model_internal::calculateBase_pub_vcfIsValid();
        }
    }
    public function invalidateDependentOnBase_prod_group():void
    {
        if (model_internal::_base_prod_groupIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_prod_group = null;
            model_internal::calculateBase_prod_groupIsValid();
        }
    }
    public function invalidateDependentOnBase_real_dens_std():void
    {
        if (model_internal::_base_real_dens_stdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_real_dens_std = null;
            model_internal::calculateBase_real_dens_stdIsValid();
        }
    }
    public function invalidateDependentOnBase_rpt_temp():void
    {
        if (model_internal::_base_rpt_tempIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_rpt_temp = null;
            model_internal::calculateBase_rpt_tempIsValid();
        }
    }
    public function invalidateDependentOnBase_pub_dens():void
    {
        if (model_internal::_base_pub_densIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_pub_dens = null;
            model_internal::calculateBase_pub_densIsValid();
        }
    }
    public function invalidateDependentOnBase_real_temp():void
    {
        if (model_internal::_base_real_tempIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_real_temp = null;
            model_internal::calculateBase_real_tempIsValid();
        }
    }
    public function invalidateDependentOnBase_name():void
    {
        if (model_internal::_base_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_name = null;
            model_internal::calculateBase_nameIsValid();
        }
    }
    public function invalidateDependentOnBase_rpt_tunt():void
    {
        if (model_internal::_base_rpt_tuntIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_rpt_tunt = null;
            model_internal::calculateBase_rpt_tuntIsValid();
        }
    }
    public function invalidateDependentOnBclass_dens_lo():void
    {
        if (model_internal::_bclass_dens_loIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_dens_lo = null;
            model_internal::calculateBclass_dens_loIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get base_pub_dens_stdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_pub_dens_stdValidator() : StyleValidator
    {
        return model_internal::_base_pub_dens_stdValidator;
    }

    model_internal function set _base_pub_dens_stdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_pub_dens_stdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_pub_dens_stdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_dens_stdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_dens_stdIsValid():Boolean
    {
        if (!model_internal::_base_pub_dens_stdIsValidCacheInitialized)
        {
            model_internal::calculateBase_pub_dens_stdIsValid();
        }

        return model_internal::_base_pub_dens_stdIsValid;
    }

    model_internal function calculateBase_pub_dens_stdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_pub_dens_stdValidator.validate(model_internal::_instance.base_pub_dens_std)
        model_internal::_base_pub_dens_stdIsValid_der = (valRes.results == null);
        model_internal::_base_pub_dens_stdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_pub_dens_stdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_pub_dens_stdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_dens_stdValidationFailureMessages():Array
    {
        if (model_internal::_base_pub_dens_stdValidationFailureMessages == null)
            model_internal::calculateBase_pub_dens_stdIsValid();

        return _base_pub_dens_stdValidationFailureMessages;
    }

    model_internal function set base_pub_dens_stdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_pub_dens_stdValidationFailureMessages;

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
            model_internal::_base_pub_dens_stdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_dens_stdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_descValidator() : StyleValidator
    {
        return model_internal::_bclass_descValidator;
    }

    model_internal function set _bclass_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_descIsValid():Boolean
    {
        if (!model_internal::_bclass_descIsValidCacheInitialized)
        {
            model_internal::calculateBclass_descIsValid();
        }

        return model_internal::_bclass_descIsValid;
    }

    model_internal function calculateBclass_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_descValidator.validate(model_internal::_instance.bclass_desc)
        model_internal::_bclass_descIsValid_der = (valRes.results == null);
        model_internal::_bclass_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_descValidationFailureMessages():Array
    {
        if (model_internal::_bclass_descValidationFailureMessages == null)
            model_internal::calculateBclass_descIsValid();

        return _bclass_descValidationFailureMessages;
    }

    model_internal function set bclass_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_descValidationFailureMessages;

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
            model_internal::_bclass_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get last_upd_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get last_upd_timeValidator() : StyleValidator
    {
        return model_internal::_last_upd_timeValidator;
    }

    model_internal function set _last_upd_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_last_upd_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_last_upd_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "last_upd_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get last_upd_timeIsValid():Boolean
    {
        if (!model_internal::_last_upd_timeIsValidCacheInitialized)
        {
            model_internal::calculateLast_upd_timeIsValid();
        }

        return model_internal::_last_upd_timeIsValid;
    }

    model_internal function calculateLast_upd_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_last_upd_timeValidator.validate(model_internal::_instance.last_upd_time)
        model_internal::_last_upd_timeIsValid_der = (valRes.results == null);
        model_internal::_last_upd_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::last_upd_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::last_upd_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get last_upd_timeValidationFailureMessages():Array
    {
        if (model_internal::_last_upd_timeValidationFailureMessages == null)
            model_internal::calculateLast_upd_timeIsValid();

        return _last_upd_timeValidationFailureMessages;
    }

    model_internal function set last_upd_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_last_upd_timeValidationFailureMessages;

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
            model_internal::_last_upd_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "last_upd_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_catStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_catValidator() : StyleValidator
    {
        return model_internal::_base_catValidator;
    }

    model_internal function set _base_catIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_catIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_catIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_catIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_catIsValid():Boolean
    {
        if (!model_internal::_base_catIsValidCacheInitialized)
        {
            model_internal::calculateBase_catIsValid();
        }

        return model_internal::_base_catIsValid;
    }

    model_internal function calculateBase_catIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_catValidator.validate(model_internal::_instance.base_cat)
        model_internal::_base_catIsValid_der = (valRes.results == null);
        model_internal::_base_catIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_catValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_catValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_catValidationFailureMessages():Array
    {
        if (model_internal::_base_catValidationFailureMessages == null)
            model_internal::calculateBase_catIsValid();

        return _base_catValidationFailureMessages;
    }

    model_internal function set base_catValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_catValidationFailureMessages;

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
            model_internal::_base_catValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_catValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_dens_hiStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_dens_hiValidator() : StyleValidator
    {
        return model_internal::_bclass_dens_hiValidator;
    }

    model_internal function set _bclass_dens_hiIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_dens_hiIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_dens_hiIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_hiIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_hiIsValid():Boolean
    {
        if (!model_internal::_bclass_dens_hiIsValidCacheInitialized)
        {
            model_internal::calculateBclass_dens_hiIsValid();
        }

        return model_internal::_bclass_dens_hiIsValid;
    }

    model_internal function calculateBclass_dens_hiIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_dens_hiValidator.validate(model_internal::_instance.bclass_dens_hi)
        model_internal::_bclass_dens_hiIsValid_der = (valRes.results == null);
        model_internal::_bclass_dens_hiIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_dens_hiValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_dens_hiValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_hiValidationFailureMessages():Array
    {
        if (model_internal::_bclass_dens_hiValidationFailureMessages == null)
            model_internal::calculateBclass_dens_hiIsValid();

        return _bclass_dens_hiValidationFailureMessages;
    }

    model_internal function set bclass_dens_hiValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_dens_hiValidationFailureMessages;

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
            model_internal::_bclass_dens_hiValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_hiValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_pub_tempStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_pub_tempValidator() : StyleValidator
    {
        return model_internal::_base_pub_tempValidator;
    }

    model_internal function set _base_pub_tempIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_pub_tempIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_pub_tempIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_tempIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_tempIsValid():Boolean
    {
        if (!model_internal::_base_pub_tempIsValidCacheInitialized)
        {
            model_internal::calculateBase_pub_tempIsValid();
        }

        return model_internal::_base_pub_tempIsValid;
    }

    model_internal function calculateBase_pub_tempIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_pub_tempValidator.validate(model_internal::_instance.base_pub_temp)
        model_internal::_base_pub_tempIsValid_der = (valRes.results == null);
        model_internal::_base_pub_tempIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_pub_tempValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_pub_tempValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_tempValidationFailureMessages():Array
    {
        if (model_internal::_base_pub_tempValidationFailureMessages == null)
            model_internal::calculateBase_pub_tempIsValid();

        return _base_pub_tempValidationFailureMessages;
    }

    model_internal function set base_pub_tempValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_pub_tempValidationFailureMessages;

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
            model_internal::_base_pub_tempValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_tempValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_real_vcfStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_real_vcfValidator() : StyleValidator
    {
        return model_internal::_base_real_vcfValidator;
    }

    model_internal function set _base_real_vcfIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_real_vcfIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_real_vcfIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_vcfIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_real_vcfIsValid():Boolean
    {
        if (!model_internal::_base_real_vcfIsValidCacheInitialized)
        {
            model_internal::calculateBase_real_vcfIsValid();
        }

        return model_internal::_base_real_vcfIsValid;
    }

    model_internal function calculateBase_real_vcfIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_real_vcfValidator.validate(model_internal::_instance.base_real_vcf)
        model_internal::_base_real_vcfIsValid_der = (valRes.results == null);
        model_internal::_base_real_vcfIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_real_vcfValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_real_vcfValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_real_vcfValidationFailureMessages():Array
    {
        if (model_internal::_base_real_vcfValidationFailureMessages == null)
            model_internal::calculateBase_real_vcfIsValid();

        return _base_real_vcfValidationFailureMessages;
    }

    model_internal function set base_real_vcfValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_real_vcfValidationFailureMessages;

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
            model_internal::_base_real_vcfValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_vcfValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_vcf_algStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_vcf_algValidator() : StyleValidator
    {
        return model_internal::_bclass_vcf_algValidator;
    }

    model_internal function set _bclass_vcf_algIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_vcf_algIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_vcf_algIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_vcf_algIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_vcf_algIsValid():Boolean
    {
        if (!model_internal::_bclass_vcf_algIsValidCacheInitialized)
        {
            model_internal::calculateBclass_vcf_algIsValid();
        }

        return model_internal::_bclass_vcf_algIsValid;
    }

    model_internal function calculateBclass_vcf_algIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_vcf_algValidator.validate(model_internal::_instance.bclass_vcf_alg)
        model_internal::_bclass_vcf_algIsValid_der = (valRes.results == null);
        model_internal::_bclass_vcf_algIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_vcf_algValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_vcf_algValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_vcf_algValidationFailureMessages():Array
    {
        if (model_internal::_bclass_vcf_algValidationFailureMessages == null)
            model_internal::calculateBclass_vcf_algIsValid();

        return _bclass_vcf_algValidationFailureMessages;
    }

    model_internal function set bclass_vcf_algValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_vcf_algValidationFailureMessages;

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
            model_internal::_bclass_vcf_algValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_vcf_algValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_compensate_priorityStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_compensate_priorityValidator() : StyleValidator
    {
        return model_internal::_base_compensate_priorityValidator;
    }

    model_internal function set _base_compensate_priorityIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_compensate_priorityIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_compensate_priorityIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_compensate_priorityIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_compensate_priorityIsValid():Boolean
    {
        if (!model_internal::_base_compensate_priorityIsValidCacheInitialized)
        {
            model_internal::calculateBase_compensate_priorityIsValid();
        }

        return model_internal::_base_compensate_priorityIsValid;
    }

    model_internal function calculateBase_compensate_priorityIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_compensate_priorityValidator.validate(model_internal::_instance.base_compensate_priority)
        model_internal::_base_compensate_priorityIsValid_der = (valRes.results == null);
        model_internal::_base_compensate_priorityIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_compensate_priorityValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_compensate_priorityValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_compensate_priorityValidationFailureMessages():Array
    {
        if (model_internal::_base_compensate_priorityValidationFailureMessages == null)
            model_internal::calculateBase_compensate_priorityIsValid();

        return _base_compensate_priorityValidationFailureMessages;
    }

    model_internal function set base_compensate_priorityValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_compensate_priorityValidationFailureMessages;

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
            model_internal::_base_compensate_priorityValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_compensate_priorityValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_compensate_modeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_compensate_modeValidator() : StyleValidator
    {
        return model_internal::_base_compensate_modeValidator;
    }

    model_internal function set _base_compensate_modeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_compensate_modeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_compensate_modeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_compensate_modeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_compensate_modeIsValid():Boolean
    {
        if (!model_internal::_base_compensate_modeIsValidCacheInitialized)
        {
            model_internal::calculateBase_compensate_modeIsValid();
        }

        return model_internal::_base_compensate_modeIsValid;
    }

    model_internal function calculateBase_compensate_modeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_compensate_modeValidator.validate(model_internal::_instance.base_compensate_mode)
        model_internal::_base_compensate_modeIsValid_der = (valRes.results == null);
        model_internal::_base_compensate_modeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_compensate_modeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_compensate_modeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_compensate_modeValidationFailureMessages():Array
    {
        if (model_internal::_base_compensate_modeValidationFailureMessages == null)
            model_internal::calculateBase_compensate_modeIsValid();

        return _base_compensate_modeValidationFailureMessages;
    }

    model_internal function set base_compensate_modeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_compensate_modeValidationFailureMessages;

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
            model_internal::_base_compensate_modeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_compensate_modeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_real_densStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_real_densValidator() : StyleValidator
    {
        return model_internal::_base_real_densValidator;
    }

    model_internal function set _base_real_densIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_real_densIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_real_densIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_densIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_real_densIsValid():Boolean
    {
        if (!model_internal::_base_real_densIsValidCacheInitialized)
        {
            model_internal::calculateBase_real_densIsValid();
        }

        return model_internal::_base_real_densIsValid;
    }

    model_internal function calculateBase_real_densIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_real_densValidator.validate(model_internal::_instance.base_real_dens)
        model_internal::_base_real_densIsValid_der = (valRes.results == null);
        model_internal::_base_real_densIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_real_densValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_real_densValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_real_densValidationFailureMessages():Array
    {
        if (model_internal::_base_real_densValidationFailureMessages == null)
            model_internal::calculateBase_real_densIsValid();

        return _base_real_densValidationFailureMessages;
    }

    model_internal function set base_real_densValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_real_densValidationFailureMessages;

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
            model_internal::_base_real_densValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_densValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get pgr_descriptionStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get pgr_descriptionValidator() : StyleValidator
    {
        return model_internal::_pgr_descriptionValidator;
    }

    model_internal function set _pgr_descriptionIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_pgr_descriptionIsValid;         
        if (oldValue !== value)
        {
            model_internal::_pgr_descriptionIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_descriptionIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get pgr_descriptionIsValid():Boolean
    {
        if (!model_internal::_pgr_descriptionIsValidCacheInitialized)
        {
            model_internal::calculatePgr_descriptionIsValid();
        }

        return model_internal::_pgr_descriptionIsValid;
    }

    model_internal function calculatePgr_descriptionIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_pgr_descriptionValidator.validate(model_internal::_instance.pgr_description)
        model_internal::_pgr_descriptionIsValid_der = (valRes.results == null);
        model_internal::_pgr_descriptionIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::pgr_descriptionValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::pgr_descriptionValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get pgr_descriptionValidationFailureMessages():Array
    {
        if (model_internal::_pgr_descriptionValidationFailureMessages == null)
            model_internal::calculatePgr_descriptionIsValid();

        return _pgr_descriptionValidationFailureMessages;
    }

    model_internal function set pgr_descriptionValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_pgr_descriptionValidationFailureMessages;

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
            model_internal::_pgr_descriptionValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_descriptionValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get pgr_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get pgr_unitValidator() : StyleValidator
    {
        return model_internal::_pgr_unitValidator;
    }

    model_internal function set _pgr_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_pgr_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_pgr_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get pgr_unitIsValid():Boolean
    {
        if (!model_internal::_pgr_unitIsValidCacheInitialized)
        {
            model_internal::calculatePgr_unitIsValid();
        }

        return model_internal::_pgr_unitIsValid;
    }

    model_internal function calculatePgr_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_pgr_unitValidator.validate(model_internal::_instance.pgr_unit)
        model_internal::_pgr_unitIsValid_der = (valRes.results == null);
        model_internal::_pgr_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::pgr_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::pgr_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get pgr_unitValidationFailureMessages():Array
    {
        if (model_internal::_pgr_unitValidationFailureMessages == null)
            model_internal::calculatePgr_unitIsValid();

        return _pgr_unitValidationFailureMessages;
    }

    model_internal function set pgr_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_pgr_unitValidationFailureMessages;

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
            model_internal::_pgr_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_pub_vcfStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_pub_vcfValidator() : StyleValidator
    {
        return model_internal::_base_pub_vcfValidator;
    }

    model_internal function set _base_pub_vcfIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_pub_vcfIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_pub_vcfIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_vcfIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_vcfIsValid():Boolean
    {
        if (!model_internal::_base_pub_vcfIsValidCacheInitialized)
        {
            model_internal::calculateBase_pub_vcfIsValid();
        }

        return model_internal::_base_pub_vcfIsValid;
    }

    model_internal function calculateBase_pub_vcfIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_pub_vcfValidator.validate(model_internal::_instance.base_pub_vcf)
        model_internal::_base_pub_vcfIsValid_der = (valRes.results == null);
        model_internal::_base_pub_vcfIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_pub_vcfValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_pub_vcfValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_vcfValidationFailureMessages():Array
    {
        if (model_internal::_base_pub_vcfValidationFailureMessages == null)
            model_internal::calculateBase_pub_vcfIsValid();

        return _base_pub_vcfValidationFailureMessages;
    }

    model_internal function set base_pub_vcfValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_pub_vcfValidationFailureMessages;

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
            model_internal::_base_pub_vcfValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_vcfValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_prod_groupStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_prod_groupValidator() : StyleValidator
    {
        return model_internal::_base_prod_groupValidator;
    }

    model_internal function set _base_prod_groupIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_prod_groupIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_prod_groupIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_prod_groupIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_prod_groupIsValid():Boolean
    {
        if (!model_internal::_base_prod_groupIsValidCacheInitialized)
        {
            model_internal::calculateBase_prod_groupIsValid();
        }

        return model_internal::_base_prod_groupIsValid;
    }

    model_internal function calculateBase_prod_groupIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_prod_groupValidator.validate(model_internal::_instance.base_prod_group)
        model_internal::_base_prod_groupIsValid_der = (valRes.results == null);
        model_internal::_base_prod_groupIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_prod_groupValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_prod_groupValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_prod_groupValidationFailureMessages():Array
    {
        if (model_internal::_base_prod_groupValidationFailureMessages == null)
            model_internal::calculateBase_prod_groupIsValid();

        return _base_prod_groupValidationFailureMessages;
    }

    model_internal function set base_prod_groupValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_prod_groupValidationFailureMessages;

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
            model_internal::_base_prod_groupValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_prod_groupValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_real_dens_stdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_real_dens_stdValidator() : StyleValidator
    {
        return model_internal::_base_real_dens_stdValidator;
    }

    model_internal function set _base_real_dens_stdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_real_dens_stdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_real_dens_stdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_dens_stdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_real_dens_stdIsValid():Boolean
    {
        if (!model_internal::_base_real_dens_stdIsValidCacheInitialized)
        {
            model_internal::calculateBase_real_dens_stdIsValid();
        }

        return model_internal::_base_real_dens_stdIsValid;
    }

    model_internal function calculateBase_real_dens_stdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_real_dens_stdValidator.validate(model_internal::_instance.base_real_dens_std)
        model_internal::_base_real_dens_stdIsValid_der = (valRes.results == null);
        model_internal::_base_real_dens_stdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_real_dens_stdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_real_dens_stdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_real_dens_stdValidationFailureMessages():Array
    {
        if (model_internal::_base_real_dens_stdValidationFailureMessages == null)
            model_internal::calculateBase_real_dens_stdIsValid();

        return _base_real_dens_stdValidationFailureMessages;
    }

    model_internal function set base_real_dens_stdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_real_dens_stdValidationFailureMessages;

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
            model_internal::_base_real_dens_stdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_dens_stdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_rpt_tempStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_rpt_tempValidator() : StyleValidator
    {
        return model_internal::_base_rpt_tempValidator;
    }

    model_internal function set _base_rpt_tempIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_rpt_tempIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_rpt_tempIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_rpt_tempIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_rpt_tempIsValid():Boolean
    {
        if (!model_internal::_base_rpt_tempIsValidCacheInitialized)
        {
            model_internal::calculateBase_rpt_tempIsValid();
        }

        return model_internal::_base_rpt_tempIsValid;
    }

    model_internal function calculateBase_rpt_tempIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_rpt_tempValidator.validate(model_internal::_instance.base_rpt_temp)
        model_internal::_base_rpt_tempIsValid_der = (valRes.results == null);
        model_internal::_base_rpt_tempIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_rpt_tempValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_rpt_tempValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_rpt_tempValidationFailureMessages():Array
    {
        if (model_internal::_base_rpt_tempValidationFailureMessages == null)
            model_internal::calculateBase_rpt_tempIsValid();

        return _base_rpt_tempValidationFailureMessages;
    }

    model_internal function set base_rpt_tempValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_rpt_tempValidationFailureMessages;

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
            model_internal::_base_rpt_tempValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_rpt_tempValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_pub_densStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_pub_densValidator() : StyleValidator
    {
        return model_internal::_base_pub_densValidator;
    }

    model_internal function set _base_pub_densIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_pub_densIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_pub_densIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_densIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_densIsValid():Boolean
    {
        if (!model_internal::_base_pub_densIsValidCacheInitialized)
        {
            model_internal::calculateBase_pub_densIsValid();
        }

        return model_internal::_base_pub_densIsValid;
    }

    model_internal function calculateBase_pub_densIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_pub_densValidator.validate(model_internal::_instance.base_pub_dens)
        model_internal::_base_pub_densIsValid_der = (valRes.results == null);
        model_internal::_base_pub_densIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_pub_densValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_pub_densValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_densValidationFailureMessages():Array
    {
        if (model_internal::_base_pub_densValidationFailureMessages == null)
            model_internal::calculateBase_pub_densIsValid();

        return _base_pub_densValidationFailureMessages;
    }

    model_internal function set base_pub_densValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_pub_densValidationFailureMessages;

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
            model_internal::_base_pub_densValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_pub_densValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_real_tempStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_real_tempValidator() : StyleValidator
    {
        return model_internal::_base_real_tempValidator;
    }

    model_internal function set _base_real_tempIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_real_tempIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_real_tempIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_tempIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_real_tempIsValid():Boolean
    {
        if (!model_internal::_base_real_tempIsValidCacheInitialized)
        {
            model_internal::calculateBase_real_tempIsValid();
        }

        return model_internal::_base_real_tempIsValid;
    }

    model_internal function calculateBase_real_tempIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_real_tempValidator.validate(model_internal::_instance.base_real_temp)
        model_internal::_base_real_tempIsValid_der = (valRes.results == null);
        model_internal::_base_real_tempIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_real_tempValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_real_tempValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_real_tempValidationFailureMessages():Array
    {
        if (model_internal::_base_real_tempValidationFailureMessages == null)
            model_internal::calculateBase_real_tempIsValid();

        return _base_real_tempValidationFailureMessages;
    }

    model_internal function set base_real_tempValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_real_tempValidationFailureMessages;

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
            model_internal::_base_real_tempValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_real_tempValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_nameValidator() : StyleValidator
    {
        return model_internal::_base_nameValidator;
    }

    model_internal function set _base_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_nameIsValid():Boolean
    {
        if (!model_internal::_base_nameIsValidCacheInitialized)
        {
            model_internal::calculateBase_nameIsValid();
        }

        return model_internal::_base_nameIsValid;
    }

    model_internal function calculateBase_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_nameValidator.validate(model_internal::_instance.base_name)
        model_internal::_base_nameIsValid_der = (valRes.results == null);
        model_internal::_base_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_nameValidationFailureMessages():Array
    {
        if (model_internal::_base_nameValidationFailureMessages == null)
            model_internal::calculateBase_nameIsValid();

        return _base_nameValidationFailureMessages;
    }

    model_internal function set base_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_nameValidationFailureMessages;

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
            model_internal::_base_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get base_rpt_tuntStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_rpt_tuntValidator() : StyleValidator
    {
        return model_internal::_base_rpt_tuntValidator;
    }

    model_internal function set _base_rpt_tuntIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_rpt_tuntIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_rpt_tuntIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_rpt_tuntIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_rpt_tuntIsValid():Boolean
    {
        if (!model_internal::_base_rpt_tuntIsValidCacheInitialized)
        {
            model_internal::calculateBase_rpt_tuntIsValid();
        }

        return model_internal::_base_rpt_tuntIsValid;
    }

    model_internal function calculateBase_rpt_tuntIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_rpt_tuntValidator.validate(model_internal::_instance.base_rpt_tunt)
        model_internal::_base_rpt_tuntIsValid_der = (valRes.results == null);
        model_internal::_base_rpt_tuntIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_rpt_tuntValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_rpt_tuntValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_rpt_tuntValidationFailureMessages():Array
    {
        if (model_internal::_base_rpt_tuntValidationFailureMessages == null)
            model_internal::calculateBase_rpt_tuntIsValid();

        return _base_rpt_tuntValidationFailureMessages;
    }

    model_internal function set base_rpt_tuntValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_rpt_tuntValidationFailureMessages;

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
            model_internal::_base_rpt_tuntValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_rpt_tuntValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_dens_loStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_dens_loValidator() : StyleValidator
    {
        return model_internal::_bclass_dens_loValidator;
    }

    model_internal function set _bclass_dens_loIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_dens_loIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_dens_loIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_loIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_loIsValid():Boolean
    {
        if (!model_internal::_bclass_dens_loIsValidCacheInitialized)
        {
            model_internal::calculateBclass_dens_loIsValid();
        }

        return model_internal::_bclass_dens_loIsValid;
    }

    model_internal function calculateBclass_dens_loIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_dens_loValidator.validate(model_internal::_instance.bclass_dens_lo)
        model_internal::_bclass_dens_loIsValid_der = (valRes.results == null);
        model_internal::_bclass_dens_loIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_dens_loValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_dens_loValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_loValidationFailureMessages():Array
    {
        if (model_internal::_bclass_dens_loValidationFailureMessages == null)
            model_internal::calculateBclass_dens_loIsValid();

        return _bclass_dens_loValidationFailureMessages;
    }

    model_internal function set bclass_dens_loValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_dens_loValidationFailureMessages;

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
            model_internal::_bclass_dens_loValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_loValidationFailureMessages", oldValue, value));
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
            case("base_pub_dens_std"):
            {
                return base_pub_dens_stdValidationFailureMessages;
            }
            case("bclass_desc"):
            {
                return bclass_descValidationFailureMessages;
            }
            case("last_upd_time"):
            {
                return last_upd_timeValidationFailureMessages;
            }
            case("base_cat"):
            {
                return base_catValidationFailureMessages;
            }
            case("bclass_dens_hi"):
            {
                return bclass_dens_hiValidationFailureMessages;
            }
            case("base_pub_temp"):
            {
                return base_pub_tempValidationFailureMessages;
            }
            case("base_real_vcf"):
            {
                return base_real_vcfValidationFailureMessages;
            }
            case("bclass_vcf_alg"):
            {
                return bclass_vcf_algValidationFailureMessages;
            }
            case("base_compensate_priority"):
            {
                return base_compensate_priorityValidationFailureMessages;
            }
            case("base_compensate_mode"):
            {
                return base_compensate_modeValidationFailureMessages;
            }
            case("base_real_dens"):
            {
                return base_real_densValidationFailureMessages;
            }
            case("pgr_description"):
            {
                return pgr_descriptionValidationFailureMessages;
            }
            case("pgr_unit"):
            {
                return pgr_unitValidationFailureMessages;
            }
            case("base_pub_vcf"):
            {
                return base_pub_vcfValidationFailureMessages;
            }
            case("base_prod_group"):
            {
                return base_prod_groupValidationFailureMessages;
            }
            case("base_real_dens_std"):
            {
                return base_real_dens_stdValidationFailureMessages;
            }
            case("base_rpt_temp"):
            {
                return base_rpt_tempValidationFailureMessages;
            }
            case("base_pub_dens"):
            {
                return base_pub_densValidationFailureMessages;
            }
            case("base_real_temp"):
            {
                return base_real_tempValidationFailureMessages;
            }
            case("base_name"):
            {
                return base_nameValidationFailureMessages;
            }
            case("base_rpt_tunt"):
            {
                return base_rpt_tuntValidationFailureMessages;
            }
            case("bclass_dens_lo"):
            {
                return bclass_dens_loValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
