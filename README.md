
> @kym/db@0.0.0 jsdoc
> jsdoc2md -c ./conf.js ./src/* ./src/**/*

## Modules

<dl>
<dt><a href="#module_connectDatabase">connectDatabase</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#associateModels">associateModels(param0)</a></dt>
<dd></dd>
<dt><a href="#connect">connect()</a> ⇒ <code>Sequelize.Sequelize</code></dt>
<dd><p>Connect to the database</p></dd>
</dl>

<a name="module_connectDatabase"></a>

## connectDatabase

* [connectDatabase](#module_connectDatabase)
    * [~sequelize](#module_connectDatabase..sequelize) : <code>Sequelize.Sequelize</code>
    * [~UserRecordFavorites](#module_connectDatabase..UserRecordFavorites) : <code>Sequelize.Model</code>
    * [~Abbrev](#module_connectDatabase..Abbrev) : <code>Sequelize.Model</code>
    * [~AbbrevMicro](#module_connectDatabase..AbbrevMicro) : <code>Sequelize.Model</code>
    * [~Day](#module_connectDatabase..Day) : <code>Sequelize.Model</code>
    * [~FoodDesc](#module_connectDatabase..FoodDesc) : <code>Sequelize.Model</code>
    * [~Weight](#module_connectDatabase..Weight) : <code>Sequelize.Model</code>
    * [~FoodRecord](#module_connectDatabase..FoodRecord) : <code>Sequelize.Model</code>
    * [~User](#module_connectDatabase..User) : <code>Sequelize.Model</code>
    * [~UserMeasurement](#module_connectDatabase..UserMeasurement) : <code>Sequelize.Model</code>
    * [~MealGoals](#module_connectDatabase..MealGoals) : <code>Sequelize.Model</code>
    * [~FoodGroup](#module_connectDatabase..FoodGroup) : <code>Sequelize.Model</code>
    * [~Meal](#module_connectDatabase..Meal) : <code>Sequelize.Model</code>
    * [~Program](#module_connectDatabase..Program) : <code>Sequelize.Model</code>
    * [~FoodPreferences](#module_connectDatabase..FoodPreferences) : <code>Sequelize.Model</code>
    * [~Preferences](#module_connectDatabase..Preferences) : <code>Sequelize.Model</code>
    * [~forceSync()](#module_connectDatabase..forceSync) ⇒ <code>Promise.&lt;any&gt;</code>
    * [~sync()](#module_connectDatabase..sync) ⇒ <code>Promise.&lt;any&gt;</code>
    * [~destroyAll()](#module_connectDatabase..destroyAll) ⇒ <code>Promise.&lt;any&gt;</code>
    * [~closeConnection()](#module_connectDatabase..closeConnection) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="module_connectDatabase..sequelize"></a>

### connectDatabase~sequelize : <code>Sequelize.Sequelize</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..UserRecordFavorites"></a>

### connectDatabase~UserRecordFavorites : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..Abbrev"></a>

### connectDatabase~Abbrev : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..AbbrevMicro"></a>

### connectDatabase~AbbrevMicro : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..Day"></a>

### connectDatabase~Day : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..FoodDesc"></a>

### connectDatabase~FoodDesc : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..Weight"></a>

### connectDatabase~Weight : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..FoodRecord"></a>

### connectDatabase~FoodRecord : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..User"></a>

### connectDatabase~User : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..UserMeasurement"></a>

### connectDatabase~UserMeasurement : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..MealGoals"></a>

### connectDatabase~MealGoals : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..FoodGroup"></a>

### connectDatabase~FoodGroup : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..Meal"></a>

### connectDatabase~Meal : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..Program"></a>

### connectDatabase~Program : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..FoodPreferences"></a>

### connectDatabase~FoodPreferences : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..Preferences"></a>

### connectDatabase~Preferences : <code>Sequelize.Model</code>
**Kind**: inner property of [<code>connectDatabase</code>](#module_connectDatabase)  
<a name="module_connectDatabase..forceSync"></a>

### connectDatabase~forceSync() ⇒ <code>Promise.&lt;any&gt;</code>
<p>sync the database by dropping and recreating tables</p>

**Kind**: inner method of [<code>connectDatabase</code>](#module_connectDatabase)  
**Summary**: <p>sync the database by dropping and recreating tables</p>.  
<a name="module_connectDatabase..sync"></a>

### connectDatabase~sync() ⇒ <code>Promise.&lt;any&gt;</code>
<p>sync the database without dropping and recreating tables</p>

**Kind**: inner method of [<code>connectDatabase</code>](#module_connectDatabase)  
**Summary**: <p>sync the database without dropping and recreating tables</p>.  
<a name="module_connectDatabase..destroyAll"></a>

### connectDatabase~destroyAll() ⇒ <code>Promise.&lt;any&gt;</code>
<p>drop all values from all models</p>

**Kind**: inner method of [<code>connectDatabase</code>](#module_connectDatabase)  
**Summary**: <p>drop all values from all models</p>.  
<a name="module_connectDatabase..closeConnection"></a>

### connectDatabase~closeConnection() ⇒ <code>Promise.&lt;any&gt;</code>
<p>close the database connection</p>

**Kind**: inner method of [<code>connectDatabase</code>](#module_connectDatabase)  
**Summary**: <p>close the database connection</p>.  
<a name="associateModels"></a>

## associateModels(param0)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| param0 | <code>object</code> | <p>arguments</p> |
| param0.sequelize | <code>Sequelize.Sequelize</code> |  |

<a name="connect"></a>

## connect() ⇒ <code>Sequelize.Sequelize</code>
<p>Connect to the database</p>

**Kind**: global function  
**Summary**: <p>Connect to the database</p>.  
