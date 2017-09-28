fixture.setBase('test/fixtures');

describe('Plugin Jquery:', function(){
  beforeEach(function(){
    fixture.load('index.html');
  });
  afterEach(function() {
    fixture.cleanup();
  });

  it('Versión es 0.5.0', function(){
    //BDD style
    const v = $.fn.kfern.getVersion();
    expect(v).to.equal('0.5.0', 'Versión 0.5.0');
  });  

  it( 'Objetivo 1. Si el HTML no tiene la estructura mínima no se realiza ningún cambio.', function( ) {
    // Arrange
    var divtest = '.wrapper_incorrecto';
    var start = $(divtest);
    // Act
    $(document).kfern.simplebox('simplebox');
    // Assert (actual, expected)
    expect($(divtest).length).to.equal(1, 'El contenido para los tests se ha cargado');    
    expect($(divtest)).to.deep.equal(start, 'Si el HTML no está completo no se realiza ningún cambio');
  });

  it( 'Objetivo 2. Se carga una página con la estructura básica.', function() {
    // Arrange
    var filtro = 'div.wrapper_a > div.simplebox';
    // Act
    $(document).kfern.simplebox();
    // Assert (actual, expected)
    var $result = $( filtro );    
    expect($result.attr('id'), 'El div contenedor tiene un id').not.to.be.undefined;
    expect($result.data('kfern')).to.equal('simplebox', 'El div contenedor se identifica correctamente');
    expect($(filtro + ' > h2.simplebox-title').is(":visible")).to.equal(true, 'El título está visible');
    expect($(filtro + ' > h2.simplebox-title > a').length).to.equal(1, 'El título es un enlace');    
    expect($(filtro + ' > div.simplebox-content').is(":visible")).to.equal(false, 'El contenido está oculto por defecto');
  });
  
  it( 'Objetivo 3. Implementar el comportamiento del componente cuando se pulsa en el título.', function() {
    // Arrange
    var filtro = 'div.wrapper_a > div.simplebox';
    var contenido_visible;
    // Act
    $(document).kfern.simplebox();
    contenido_visible = $(filtro + ' > div.simplebox-content').is(":visible");
    $(filtro + ' > h2.simplebox-title > a').trigger('click');
    // Assert
    expect(contenido_visible == false && $(filtro + ' > div.simplebox-content').is(":visible")).to.be.equal(true, 'Si un contenido está oculto, cuando se pulse en el título se ha de mostrar el contenido asociado');
    
    //Si un contenido está visible, cuando se pulse en el título se ha de ocultar el contenido asociado
    // Arrange
    contenido_visible = $(filtro + ' > div.simplebox-content').is(":visible");
    //Act
    $(filtro + ' > h2.simplebox-title > a').trigger('click');
    // Assert
    expect(contenido_visible && $(filtro + ' > div.simplebox-content').is(":visible")).to.be.equal(false, 'Si un contenido está visible, cuando se pulse en el título se ha de ocultar el contenido asociado');
  });
  
});//describe


/*

  QUnit.test( 'Objetivo 3. Implementar el comportamiento del componente cuando se pulsa en el título.', function( assert ) {
    // Arrange
    var filtro = 'div.wrapper_a > div.simplebox';
    var contenido_visible;
    // Act
    $(document).kfern.simplebox();
    contenido_visible = $(filtro + ' > div.simplebox-content').is(":visible");
    $(filtro + ' > h2.simplebox-title > a').trigger('click');
    // Assert
    assert.ok( contenido_visible == false && $(filtro + ' > div.simplebox-content').is(":visible") == true, 'Si un contenido está oculto, cuando se pulse en el título se ha de mostrar el contenido asociado.' );
    
    //Si un contenido está visible, cuando se pulse en el título se ha de ocultar el contenido asociado
    // Arrange
    contenido_visible = $(filtro + ' > div.simplebox-content').is(":visible");
    //Act
    $(filtro + ' > h2.simplebox-title > a').trigger('click');
    // Assert
    assert.ok( contenido_visible && $(filtro + ' > div.simplebox-content').is(":visible") == false, 'Si un contenido está visible, cuando se pulse en el título se ha de ocultar el contenido asociado.' );

  });
*/