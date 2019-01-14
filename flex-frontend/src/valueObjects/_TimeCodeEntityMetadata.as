
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
internal class _TimeCodeEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("TCD_WED", "TCD_SUN", "TCD_SAT", "TCD_FRI", "TCD_TITLE", "TCD_THU", "TCD_TUE", "TCD_MON");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("TCD_WED", "TCD_SUN", "TCD_SAT", "TCD_FRI", "TCD_TITLE", "TCD_THU", "TCD_TUE", "TCD_MON");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("TCD_WED", "TCD_SUN", "TCD_SAT", "TCD_FRI", "TCD_TITLE", "TCD_THU", "TCD_TUE", "TCD_MON");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("TCD_WED", "TCD_SUN", "TCD_SAT", "TCD_FRI", "TCD_TITLE", "TCD_THU", "TCD_TUE", "TCD_MON");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("TCD_WED", "TCD_SUN", "TCD_SAT", "TCD_FRI", "TCD_TITLE", "TCD_THU", "TCD_TUE", "TCD_MON");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "TimeCode";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _TCD_WEDIsValid:Boolean;
    model_internal var _TCD_WEDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_WEDIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_WEDValidationFailureMessages:Array;
    
    model_internal var _TCD_SUNIsValid:Boolean;
    model_internal var _TCD_SUNValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_SUNIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_SUNValidationFailureMessages:Array;
    
    model_internal var _TCD_SATIsValid:Boolean;
    model_internal var _TCD_SATValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_SATIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_SATValidationFailureMessages:Array;
    
    model_internal var _TCD_FRIIsValid:Boolean;
    model_internal var _TCD_FRIValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_FRIIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_FRIValidationFailureMessages:Array;
    
    model_internal var _TCD_TITLEIsValid:Boolean;
    model_internal var _TCD_TITLEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_TITLEIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_TITLEValidationFailureMessages:Array;
    
    model_internal var _TCD_THUIsValid:Boolean;
    model_internal var _TCD_THUValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_THUIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_THUValidationFailureMessages:Array;
    
    model_internal var _TCD_TUEIsValid:Boolean;
    model_internal var _TCD_TUEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_TUEIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_TUEValidationFailureMessages:Array;
    
    model_internal var _TCD_MONIsValid:Boolean;
    model_internal var _TCD_MONValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _TCD_MONIsValidCacheInitialized:Boolean = false;
    model_internal var _TCD_MONValidationFailureMessages:Array;

    model_internal var _instance:_Super_TimeCode;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _TimeCodeEntityMetadata(value : _Super_TimeCode)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["TCD_WED"] = new Array();
            model_internal::dependentsOnMap["TCD_SUN"] = new Array();
            model_internal::dependentsOnMap["TCD_SAT"] = new Array();
            model_internal::dependentsOnMap["TCD_FRI"] = new Array();
            model_internal::dependentsOnMap["TCD_TITLE"] = new Array();
            model_internal::dependentsOnMap["TCD_THU"] = new Array();
            model_internal::dependentsOnMap["TCD_TUE"] = new Array();
            model_internal::dependentsOnMap["TCD_MON"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["TCD_WED"] = "String";
        model_internal::propertyTypeMap["TCD_SUN"] = "String";
        model_internal::propertyTypeMap["TCD_SAT"] = "String";
        model_internal::propertyTypeMap["TCD_FRI"] = "String";
        model_internal::propertyTypeMap["TCD_TITLE"] = "String";
        model_internal::propertyTypeMap["TCD_THU"] = "String";
        model_internal::propertyTypeMap["TCD_TUE"] = "String";
        model_internal::propertyTypeMap["TCD_MON"] = "String";

        model_internal::_instance = value;
        model_internal::_TCD_WEDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_WED);
        model_internal::_TCD_WEDValidator.required = true;
        model_internal::_TCD_WEDValidator.requiredFieldError = "TCD_WED is required";
        //model_internal::_TCD_WEDValidator.source = model_internal::_instance;
        //model_internal::_TCD_WEDValidator.property = "TCD_WED";
        model_internal::_TCD_SUNValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_SUN);
        model_internal::_TCD_SUNValidator.required = true;
        model_internal::_TCD_SUNValidator.requiredFieldError = "TCD_SUN is required";
        //model_internal::_TCD_SUNValidator.source = model_internal::_instance;
        //model_internal::_TCD_SUNValidator.property = "TCD_SUN";
        model_internal::_TCD_SATValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_SAT);
        model_internal::_TCD_SATValidator.required = true;
        model_internal::_TCD_SATValidator.requiredFieldError = "TCD_SAT is required";
        //model_internal::_TCD_SATValidator.source = model_internal::_instance;
        //model_internal::_TCD_SATValidator.property = "TCD_SAT";
        model_internal::_TCD_FRIValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_FRI);
        model_internal::_TCD_FRIValidator.required = true;
        model_internal::_TCD_FRIValidator.requiredFieldError = "TCD_FRI is required";
        //model_internal::_TCD_FRIValidator.source = model_internal::_instance;
        //model_internal::_TCD_FRIValidator.property = "TCD_FRI";
        model_internal::_TCD_TITLEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_TITLE);
        model_internal::_TCD_TITLEValidator.required = true;
        model_internal::_TCD_TITLEValidator.requiredFieldError = "TCD_TITLE is required";
        //model_internal::_TCD_TITLEValidator.source = model_internal::_instance;
        //model_internal::_TCD_TITLEValidator.property = "TCD_TITLE";
        model_internal::_TCD_THUValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_THU);
        model_internal::_TCD_THUValidator.required = true;
        model_internal::_TCD_THUValidator.requiredFieldError = "TCD_THU is required";
        //model_internal::_TCD_THUValidator.source = model_internal::_instance;
        //model_internal::_TCD_THUValidator.property = "TCD_THU";
        model_internal::_TCD_TUEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_TUE);
        model_internal::_TCD_TUEValidator.required = true;
        model_internal::_TCD_TUEValidator.requiredFieldError = "TCD_TUE is required";
        //model_internal::_TCD_TUEValidator.source = model_internal::_instance;
        //model_internal::_TCD_TUEValidator.property = "TCD_TUE";
        model_internal::_TCD_MONValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTCD_MON);
        model_internal::_TCD_MONValidator.required = true;
        model_internal::_TCD_MONValidator.requiredFieldError = "TCD_MON is required";
        //model_internal::_TCD_MONValidator.source = model_internal::_instance;
        //model_internal::_TCD_MONValidator.property = "TCD_MON";
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
            throw new Error(propertyName + " is not a data property of entity TimeCode");
            
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
            throw new Error(propertyName + " is not a collection property of entity TimeCode");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of TimeCode");

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
            throw new Error(propertyName + " does not exist for entity TimeCode");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity TimeCode");
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
            throw new Error(propertyName + " does not exist for entity TimeCode");
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
    public function get isTCD_WEDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_SUNAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_SATAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_FRIAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_TITLEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_THUAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_TUEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTCD_MONAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTCD_WED():void
    {
        if (model_internal::_TCD_WEDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_WED = null;
            model_internal::calculateTCD_WEDIsValid();
        }
    }
    public function invalidateDependentOnTCD_SUN():void
    {
        if (model_internal::_TCD_SUNIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_SUN = null;
            model_internal::calculateTCD_SUNIsValid();
        }
    }
    public function invalidateDependentOnTCD_SAT():void
    {
        if (model_internal::_TCD_SATIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_SAT = null;
            model_internal::calculateTCD_SATIsValid();
        }
    }
    public function invalidateDependentOnTCD_FRI():void
    {
        if (model_internal::_TCD_FRIIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_FRI = null;
            model_internal::calculateTCD_FRIIsValid();
        }
    }
    public function invalidateDependentOnTCD_TITLE():void
    {
        if (model_internal::_TCD_TITLEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_TITLE = null;
            model_internal::calculateTCD_TITLEIsValid();
        }
    }
    public function invalidateDependentOnTCD_THU():void
    {
        if (model_internal::_TCD_THUIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_THU = null;
            model_internal::calculateTCD_THUIsValid();
        }
    }
    public function invalidateDependentOnTCD_TUE():void
    {
        if (model_internal::_TCD_TUEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_TUE = null;
            model_internal::calculateTCD_TUEIsValid();
        }
    }
    public function invalidateDependentOnTCD_MON():void
    {
        if (model_internal::_TCD_MONIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTCD_MON = null;
            model_internal::calculateTCD_MONIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_WEDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_WEDValidator() : StyleValidator
    {
        return model_internal::_TCD_WEDValidator;
    }

    model_internal function set _TCD_WEDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_WEDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_WEDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_WEDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_WEDIsValid():Boolean
    {
        if (!model_internal::_TCD_WEDIsValidCacheInitialized)
        {
            model_internal::calculateTCD_WEDIsValid();
        }

        return model_internal::_TCD_WEDIsValid;
    }

    model_internal function calculateTCD_WEDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_WEDValidator.validate(model_internal::_instance.TCD_WED)
        model_internal::_TCD_WEDIsValid_der = (valRes.results == null);
        model_internal::_TCD_WEDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_WEDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_WEDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_WEDValidationFailureMessages():Array
    {
        if (model_internal::_TCD_WEDValidationFailureMessages == null)
            model_internal::calculateTCD_WEDIsValid();

        return _TCD_WEDValidationFailureMessages;
    }

    model_internal function set TCD_WEDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_WEDValidationFailureMessages;

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
            model_internal::_TCD_WEDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_WEDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_SUNStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_SUNValidator() : StyleValidator
    {
        return model_internal::_TCD_SUNValidator;
    }

    model_internal function set _TCD_SUNIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_SUNIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_SUNIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_SUNIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_SUNIsValid():Boolean
    {
        if (!model_internal::_TCD_SUNIsValidCacheInitialized)
        {
            model_internal::calculateTCD_SUNIsValid();
        }

        return model_internal::_TCD_SUNIsValid;
    }

    model_internal function calculateTCD_SUNIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_SUNValidator.validate(model_internal::_instance.TCD_SUN)
        model_internal::_TCD_SUNIsValid_der = (valRes.results == null);
        model_internal::_TCD_SUNIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_SUNValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_SUNValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_SUNValidationFailureMessages():Array
    {
        if (model_internal::_TCD_SUNValidationFailureMessages == null)
            model_internal::calculateTCD_SUNIsValid();

        return _TCD_SUNValidationFailureMessages;
    }

    model_internal function set TCD_SUNValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_SUNValidationFailureMessages;

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
            model_internal::_TCD_SUNValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_SUNValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_SATStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_SATValidator() : StyleValidator
    {
        return model_internal::_TCD_SATValidator;
    }

    model_internal function set _TCD_SATIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_SATIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_SATIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_SATIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_SATIsValid():Boolean
    {
        if (!model_internal::_TCD_SATIsValidCacheInitialized)
        {
            model_internal::calculateTCD_SATIsValid();
        }

        return model_internal::_TCD_SATIsValid;
    }

    model_internal function calculateTCD_SATIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_SATValidator.validate(model_internal::_instance.TCD_SAT)
        model_internal::_TCD_SATIsValid_der = (valRes.results == null);
        model_internal::_TCD_SATIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_SATValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_SATValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_SATValidationFailureMessages():Array
    {
        if (model_internal::_TCD_SATValidationFailureMessages == null)
            model_internal::calculateTCD_SATIsValid();

        return _TCD_SATValidationFailureMessages;
    }

    model_internal function set TCD_SATValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_SATValidationFailureMessages;

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
            model_internal::_TCD_SATValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_SATValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_FRIStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_FRIValidator() : StyleValidator
    {
        return model_internal::_TCD_FRIValidator;
    }

    model_internal function set _TCD_FRIIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_FRIIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_FRIIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_FRIIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_FRIIsValid():Boolean
    {
        if (!model_internal::_TCD_FRIIsValidCacheInitialized)
        {
            model_internal::calculateTCD_FRIIsValid();
        }

        return model_internal::_TCD_FRIIsValid;
    }

    model_internal function calculateTCD_FRIIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_FRIValidator.validate(model_internal::_instance.TCD_FRI)
        model_internal::_TCD_FRIIsValid_der = (valRes.results == null);
        model_internal::_TCD_FRIIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_FRIValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_FRIValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_FRIValidationFailureMessages():Array
    {
        if (model_internal::_TCD_FRIValidationFailureMessages == null)
            model_internal::calculateTCD_FRIIsValid();

        return _TCD_FRIValidationFailureMessages;
    }

    model_internal function set TCD_FRIValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_FRIValidationFailureMessages;

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
            model_internal::_TCD_FRIValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_FRIValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_TITLEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_TITLEValidator() : StyleValidator
    {
        return model_internal::_TCD_TITLEValidator;
    }

    model_internal function set _TCD_TITLEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_TITLEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_TITLEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_TITLEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_TITLEIsValid():Boolean
    {
        if (!model_internal::_TCD_TITLEIsValidCacheInitialized)
        {
            model_internal::calculateTCD_TITLEIsValid();
        }

        return model_internal::_TCD_TITLEIsValid;
    }

    model_internal function calculateTCD_TITLEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_TITLEValidator.validate(model_internal::_instance.TCD_TITLE)
        model_internal::_TCD_TITLEIsValid_der = (valRes.results == null);
        model_internal::_TCD_TITLEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_TITLEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_TITLEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_TITLEValidationFailureMessages():Array
    {
        if (model_internal::_TCD_TITLEValidationFailureMessages == null)
            model_internal::calculateTCD_TITLEIsValid();

        return _TCD_TITLEValidationFailureMessages;
    }

    model_internal function set TCD_TITLEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_TITLEValidationFailureMessages;

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
            model_internal::_TCD_TITLEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_TITLEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_THUStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_THUValidator() : StyleValidator
    {
        return model_internal::_TCD_THUValidator;
    }

    model_internal function set _TCD_THUIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_THUIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_THUIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_THUIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_THUIsValid():Boolean
    {
        if (!model_internal::_TCD_THUIsValidCacheInitialized)
        {
            model_internal::calculateTCD_THUIsValid();
        }

        return model_internal::_TCD_THUIsValid;
    }

    model_internal function calculateTCD_THUIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_THUValidator.validate(model_internal::_instance.TCD_THU)
        model_internal::_TCD_THUIsValid_der = (valRes.results == null);
        model_internal::_TCD_THUIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_THUValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_THUValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_THUValidationFailureMessages():Array
    {
        if (model_internal::_TCD_THUValidationFailureMessages == null)
            model_internal::calculateTCD_THUIsValid();

        return _TCD_THUValidationFailureMessages;
    }

    model_internal function set TCD_THUValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_THUValidationFailureMessages;

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
            model_internal::_TCD_THUValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_THUValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_TUEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_TUEValidator() : StyleValidator
    {
        return model_internal::_TCD_TUEValidator;
    }

    model_internal function set _TCD_TUEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_TUEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_TUEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_TUEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_TUEIsValid():Boolean
    {
        if (!model_internal::_TCD_TUEIsValidCacheInitialized)
        {
            model_internal::calculateTCD_TUEIsValid();
        }

        return model_internal::_TCD_TUEIsValid;
    }

    model_internal function calculateTCD_TUEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_TUEValidator.validate(model_internal::_instance.TCD_TUE)
        model_internal::_TCD_TUEIsValid_der = (valRes.results == null);
        model_internal::_TCD_TUEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_TUEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_TUEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_TUEValidationFailureMessages():Array
    {
        if (model_internal::_TCD_TUEValidationFailureMessages == null)
            model_internal::calculateTCD_TUEIsValid();

        return _TCD_TUEValidationFailureMessages;
    }

    model_internal function set TCD_TUEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_TUEValidationFailureMessages;

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
            model_internal::_TCD_TUEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_TUEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get TCD_MONStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get TCD_MONValidator() : StyleValidator
    {
        return model_internal::_TCD_MONValidator;
    }

    model_internal function set _TCD_MONIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_TCD_MONIsValid;         
        if (oldValue !== value)
        {
            model_internal::_TCD_MONIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_MONIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get TCD_MONIsValid():Boolean
    {
        if (!model_internal::_TCD_MONIsValidCacheInitialized)
        {
            model_internal::calculateTCD_MONIsValid();
        }

        return model_internal::_TCD_MONIsValid;
    }

    model_internal function calculateTCD_MONIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_TCD_MONValidator.validate(model_internal::_instance.TCD_MON)
        model_internal::_TCD_MONIsValid_der = (valRes.results == null);
        model_internal::_TCD_MONIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::TCD_MONValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::TCD_MONValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get TCD_MONValidationFailureMessages():Array
    {
        if (model_internal::_TCD_MONValidationFailureMessages == null)
            model_internal::calculateTCD_MONIsValid();

        return _TCD_MONValidationFailureMessages;
    }

    model_internal function set TCD_MONValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_TCD_MONValidationFailureMessages;

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
            model_internal::_TCD_MONValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_MONValidationFailureMessages", oldValue, value));
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
            case("TCD_WED"):
            {
                return TCD_WEDValidationFailureMessages;
            }
            case("TCD_SUN"):
            {
                return TCD_SUNValidationFailureMessages;
            }
            case("TCD_SAT"):
            {
                return TCD_SATValidationFailureMessages;
            }
            case("TCD_FRI"):
            {
                return TCD_FRIValidationFailureMessages;
            }
            case("TCD_TITLE"):
            {
                return TCD_TITLEValidationFailureMessages;
            }
            case("TCD_THU"):
            {
                return TCD_THUValidationFailureMessages;
            }
            case("TCD_TUE"):
            {
                return TCD_TUEValidationFailureMessages;
            }
            case("TCD_MON"):
            {
                return TCD_MONValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
