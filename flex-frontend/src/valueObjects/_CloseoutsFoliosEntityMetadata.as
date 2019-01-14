
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
internal class _CloseoutsFoliosEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("prev_closeout_date", "status", "closeout_date", "closeout_folio", "closeout_nr");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("prev_closeout_date", "status", "closeout_date", "closeout_folio", "closeout_nr");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("prev_closeout_date", "status", "closeout_date", "closeout_folio", "closeout_nr");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("prev_closeout_date", "status", "closeout_date", "closeout_folio", "closeout_nr");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("prev_closeout_date", "status", "closeout_date", "closeout_folio", "closeout_nr");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "CloseoutsFolios";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _prev_closeout_dateIsValid:Boolean;
    model_internal var _prev_closeout_dateValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prev_closeout_dateIsValidCacheInitialized:Boolean = false;
    model_internal var _prev_closeout_dateValidationFailureMessages:Array;
    
    model_internal var _statusIsValid:Boolean;
    model_internal var _statusValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _statusIsValidCacheInitialized:Boolean = false;
    model_internal var _statusValidationFailureMessages:Array;
    
    model_internal var _closeout_dateIsValid:Boolean;
    model_internal var _closeout_dateValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _closeout_dateIsValidCacheInitialized:Boolean = false;
    model_internal var _closeout_dateValidationFailureMessages:Array;
    
    model_internal var _closeout_folioIsValid:Boolean;
    model_internal var _closeout_folioValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _closeout_folioIsValidCacheInitialized:Boolean = false;
    model_internal var _closeout_folioValidationFailureMessages:Array;
    
    model_internal var _closeout_nrIsValid:Boolean;
    model_internal var _closeout_nrValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _closeout_nrIsValidCacheInitialized:Boolean = false;
    model_internal var _closeout_nrValidationFailureMessages:Array;

    model_internal var _instance:_Super_CloseoutsFolios;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _CloseoutsFoliosEntityMetadata(value : _Super_CloseoutsFolios)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["prev_closeout_date"] = new Array();
            model_internal::dependentsOnMap["status"] = new Array();
            model_internal::dependentsOnMap["closeout_date"] = new Array();
            model_internal::dependentsOnMap["closeout_folio"] = new Array();
            model_internal::dependentsOnMap["closeout_nr"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["prev_closeout_date"] = "String";
        model_internal::propertyTypeMap["status"] = "String";
        model_internal::propertyTypeMap["closeout_date"] = "String";
        model_internal::propertyTypeMap["closeout_folio"] = "String";
        model_internal::propertyTypeMap["closeout_nr"] = "String";

        model_internal::_instance = value;
        model_internal::_prev_closeout_dateValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrev_closeout_date);
        model_internal::_prev_closeout_dateValidator.required = true;
        model_internal::_prev_closeout_dateValidator.requiredFieldError = "prev_closeout_date is required";
        //model_internal::_prev_closeout_dateValidator.source = model_internal::_instance;
        //model_internal::_prev_closeout_dateValidator.property = "prev_closeout_date";
        model_internal::_statusValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForStatus);
        model_internal::_statusValidator.required = true;
        model_internal::_statusValidator.requiredFieldError = "status is required";
        //model_internal::_statusValidator.source = model_internal::_instance;
        //model_internal::_statusValidator.property = "status";
        model_internal::_closeout_dateValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCloseout_date);
        model_internal::_closeout_dateValidator.required = true;
        model_internal::_closeout_dateValidator.requiredFieldError = "closeout_date is required";
        //model_internal::_closeout_dateValidator.source = model_internal::_instance;
        //model_internal::_closeout_dateValidator.property = "closeout_date";
        model_internal::_closeout_folioValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCloseout_folio);
        model_internal::_closeout_folioValidator.required = true;
        model_internal::_closeout_folioValidator.requiredFieldError = "closeout_folio is required";
        //model_internal::_closeout_folioValidator.source = model_internal::_instance;
        //model_internal::_closeout_folioValidator.property = "closeout_folio";
        model_internal::_closeout_nrValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCloseout_nr);
        model_internal::_closeout_nrValidator.required = true;
        model_internal::_closeout_nrValidator.requiredFieldError = "closeout_nr is required";
        //model_internal::_closeout_nrValidator.source = model_internal::_instance;
        //model_internal::_closeout_nrValidator.property = "closeout_nr";
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
            throw new Error(propertyName + " is not a data property of entity CloseoutsFolios");
            
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
            throw new Error(propertyName + " is not a collection property of entity CloseoutsFolios");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of CloseoutsFolios");

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
            throw new Error(propertyName + " does not exist for entity CloseoutsFolios");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity CloseoutsFolios");
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
            throw new Error(propertyName + " does not exist for entity CloseoutsFolios");
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
    public function get isPrev_closeout_dateAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isStatusAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCloseout_dateAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCloseout_folioAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCloseout_nrAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPrev_closeout_date():void
    {
        if (model_internal::_prev_closeout_dateIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrev_closeout_date = null;
            model_internal::calculatePrev_closeout_dateIsValid();
        }
    }
    public function invalidateDependentOnStatus():void
    {
        if (model_internal::_statusIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfStatus = null;
            model_internal::calculateStatusIsValid();
        }
    }
    public function invalidateDependentOnCloseout_date():void
    {
        if (model_internal::_closeout_dateIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCloseout_date = null;
            model_internal::calculateCloseout_dateIsValid();
        }
    }
    public function invalidateDependentOnCloseout_folio():void
    {
        if (model_internal::_closeout_folioIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCloseout_folio = null;
            model_internal::calculateCloseout_folioIsValid();
        }
    }
    public function invalidateDependentOnCloseout_nr():void
    {
        if (model_internal::_closeout_nrIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCloseout_nr = null;
            model_internal::calculateCloseout_nrIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get prev_closeout_dateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prev_closeout_dateValidator() : StyleValidator
    {
        return model_internal::_prev_closeout_dateValidator;
    }

    model_internal function set _prev_closeout_dateIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prev_closeout_dateIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prev_closeout_dateIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_closeout_dateIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prev_closeout_dateIsValid():Boolean
    {
        if (!model_internal::_prev_closeout_dateIsValidCacheInitialized)
        {
            model_internal::calculatePrev_closeout_dateIsValid();
        }

        return model_internal::_prev_closeout_dateIsValid;
    }

    model_internal function calculatePrev_closeout_dateIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prev_closeout_dateValidator.validate(model_internal::_instance.prev_closeout_date)
        model_internal::_prev_closeout_dateIsValid_der = (valRes.results == null);
        model_internal::_prev_closeout_dateIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prev_closeout_dateValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prev_closeout_dateValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prev_closeout_dateValidationFailureMessages():Array
    {
        if (model_internal::_prev_closeout_dateValidationFailureMessages == null)
            model_internal::calculatePrev_closeout_dateIsValid();

        return _prev_closeout_dateValidationFailureMessages;
    }

    model_internal function set prev_closeout_dateValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prev_closeout_dateValidationFailureMessages;

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
            model_internal::_prev_closeout_dateValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_closeout_dateValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get statusStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get statusValidator() : StyleValidator
    {
        return model_internal::_statusValidator;
    }

    model_internal function set _statusIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_statusIsValid;         
        if (oldValue !== value)
        {
            model_internal::_statusIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "statusIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get statusIsValid():Boolean
    {
        if (!model_internal::_statusIsValidCacheInitialized)
        {
            model_internal::calculateStatusIsValid();
        }

        return model_internal::_statusIsValid;
    }

    model_internal function calculateStatusIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_statusValidator.validate(model_internal::_instance.status)
        model_internal::_statusIsValid_der = (valRes.results == null);
        model_internal::_statusIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::statusValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::statusValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get statusValidationFailureMessages():Array
    {
        if (model_internal::_statusValidationFailureMessages == null)
            model_internal::calculateStatusIsValid();

        return _statusValidationFailureMessages;
    }

    model_internal function set statusValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_statusValidationFailureMessages;

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
            model_internal::_statusValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "statusValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get closeout_dateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get closeout_dateValidator() : StyleValidator
    {
        return model_internal::_closeout_dateValidator;
    }

    model_internal function set _closeout_dateIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_closeout_dateIsValid;         
        if (oldValue !== value)
        {
            model_internal::_closeout_dateIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_dateIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get closeout_dateIsValid():Boolean
    {
        if (!model_internal::_closeout_dateIsValidCacheInitialized)
        {
            model_internal::calculateCloseout_dateIsValid();
        }

        return model_internal::_closeout_dateIsValid;
    }

    model_internal function calculateCloseout_dateIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_closeout_dateValidator.validate(model_internal::_instance.closeout_date)
        model_internal::_closeout_dateIsValid_der = (valRes.results == null);
        model_internal::_closeout_dateIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::closeout_dateValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::closeout_dateValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get closeout_dateValidationFailureMessages():Array
    {
        if (model_internal::_closeout_dateValidationFailureMessages == null)
            model_internal::calculateCloseout_dateIsValid();

        return _closeout_dateValidationFailureMessages;
    }

    model_internal function set closeout_dateValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_closeout_dateValidationFailureMessages;

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
            model_internal::_closeout_dateValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_dateValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get closeout_folioStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get closeout_folioValidator() : StyleValidator
    {
        return model_internal::_closeout_folioValidator;
    }

    model_internal function set _closeout_folioIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_closeout_folioIsValid;         
        if (oldValue !== value)
        {
            model_internal::_closeout_folioIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_folioIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get closeout_folioIsValid():Boolean
    {
        if (!model_internal::_closeout_folioIsValidCacheInitialized)
        {
            model_internal::calculateCloseout_folioIsValid();
        }

        return model_internal::_closeout_folioIsValid;
    }

    model_internal function calculateCloseout_folioIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_closeout_folioValidator.validate(model_internal::_instance.closeout_folio)
        model_internal::_closeout_folioIsValid_der = (valRes.results == null);
        model_internal::_closeout_folioIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::closeout_folioValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::closeout_folioValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get closeout_folioValidationFailureMessages():Array
    {
        if (model_internal::_closeout_folioValidationFailureMessages == null)
            model_internal::calculateCloseout_folioIsValid();

        return _closeout_folioValidationFailureMessages;
    }

    model_internal function set closeout_folioValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_closeout_folioValidationFailureMessages;

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
            model_internal::_closeout_folioValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_folioValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get closeout_nrStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get closeout_nrValidator() : StyleValidator
    {
        return model_internal::_closeout_nrValidator;
    }

    model_internal function set _closeout_nrIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_closeout_nrIsValid;         
        if (oldValue !== value)
        {
            model_internal::_closeout_nrIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_nrIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get closeout_nrIsValid():Boolean
    {
        if (!model_internal::_closeout_nrIsValidCacheInitialized)
        {
            model_internal::calculateCloseout_nrIsValid();
        }

        return model_internal::_closeout_nrIsValid;
    }

    model_internal function calculateCloseout_nrIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_closeout_nrValidator.validate(model_internal::_instance.closeout_nr)
        model_internal::_closeout_nrIsValid_der = (valRes.results == null);
        model_internal::_closeout_nrIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::closeout_nrValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::closeout_nrValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get closeout_nrValidationFailureMessages():Array
    {
        if (model_internal::_closeout_nrValidationFailureMessages == null)
            model_internal::calculateCloseout_nrIsValid();

        return _closeout_nrValidationFailureMessages;
    }

    model_internal function set closeout_nrValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_closeout_nrValidationFailureMessages;

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
            model_internal::_closeout_nrValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_nrValidationFailureMessages", oldValue, value));
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
            case("prev_closeout_date"):
            {
                return prev_closeout_dateValidationFailureMessages;
            }
            case("status"):
            {
                return statusValidationFailureMessages;
            }
            case("closeout_date"):
            {
                return closeout_dateValidationFailureMessages;
            }
            case("closeout_folio"):
            {
                return closeout_folioValidationFailureMessages;
            }
            case("closeout_nr"):
            {
                return closeout_nrValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
