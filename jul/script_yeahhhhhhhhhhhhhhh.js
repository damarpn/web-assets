// ============================================================ FORM Kontak Submit ========================================================== //
$("#form-kontak").submit(function(){
	var form = $('#form-kontak');
    $.ajax( {
      type: "POST",
      url: form.attr( 'action' ),
      data: form.serialize(),
      success: function( response ) {
      		$('.loader').hide();
    		$('#form-kontak button').prop('disabled', false);
    		$('#form-kontak button').html('Send');
    		$('#form-kontak input').val('');
    		$('#form-kontak textarea').val('');
    		$('#hasil').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Pesan ada telah kami terima.</div>');
    		$('#hasil').show();
    		setTimeout(function() {$('#hasil').hide(1000);}, 4000);
      },
      error: function(){
      		$('.loader').hide();
    		$('#form-kontak button').prop('disabled', false);
    		$('#form-kontak button').html('Send');
    		$('#hasil').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong> Terjadi kesalahan saat mengirim pesan.</div>');
    		$('#hasil').show();
    		setTimeout(function() {$('#hasil').slideUp(1000);}, 2000);
      }
    } );
    $('.loader').show();
    $('#form-kontak button').prop('disabled', true);
    $('#form-kontak button').html('Mengirim...');
    return false;
});
// ========================================================================================================================================= //


// ======================================= Fungsi Potong ================================================= //
function potong(content, start, end) {
  
  var r = content.split(start);
  
  var er = r[1];
  
  if (er) {
    
    var nr = er.split(end);
    
    return nr[0];
    
  }
}
// =========================================================================================================== //


// =========================================== Deteksi URL ============================================== //
function ambil(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// ===================================================================================================== //


var judul = " - "+document.title;
var page = "";
if (ambil('page'))
{
  page = " (Page "+ambil('page')+")";
}
if (ambil('view') == 'catatan' && ambil('id'))
{
  document.title = $('h2').text()+judul;
  var id = ambil('id');
  // ------------------------------------------------------------------------------------------------------------------------------ //
      /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

    var disqus_config = function () {
    this.page.url = 'https://jul.pramudito.com/?view=catatan&id='+id;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = 'https://jul.pramudito.com/?view=catatan&id='+id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://jul-prm.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
    // ------------------------------------------------------------------------------------------------------------------------------ //
}
else if(ambil('view'))
{
  document.title = $('nav li.active').text()+page+judul;
}

function info(text)
{
  $('#informasi').html('<div class="modal fade" id="modalinfo" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Informasi</h4></div><div class="modal-body"><p>'+text+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div></div>');
  $('#modalinfo').modal('show');
}


function show_btn_logout()
{
  $('#btn-login').html('<a href="ajax.php?act=logout" id="logout" class="btn-danger">Logout</a>');
}


$("#logout").click(function(event){
    logout();
    return false;
});

function logout()
{
    $.get( "ajax.php?act=logout" );
    $('#btn-login').html('<a href="#" id="login-menu" class="btn-success">Login</a>');
    info('logout berhasil');
    $("#login-menu").click(function(event){
      show_login_modal();
      return false;
    });
    
}


//======================================= Script for login =========================================== //

$("#login-menu").click(function(event){
    show_login_modal();
    return false;
});


function show_login_modal()
{
  $('#informasi').html('<div id="login" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><form action="ajax.php?act=cek_login" method="post" role="form"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Login</h4></div><div class="modal-body"><div id="result"></div><div class="hide-login"><div class="form-group" class="hide-login"><label for="username"><span class="glyphicon glyphicon-user"></span>Username</label><input type="text" class="form-control" id="username" name="username" placeholder="Username" required></div><div class="form-group" class="hide-login"><label for="password"><span class="glyphicon glyphicon-eye-open"></span> Password</label><input type="password" class="form-control" id="password" name="password" placeholder="Password" required></div></div></div><div class="modal-footer"><button type="submit" class="btn btn-info hide-login" name="submit">Login</button><button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button></div></form></div></div></div>');
  $('#login').modal('show');
  $("#login form").submit(function(){
      var form = $('#login form');
      $('#login #result').html('<img src="https://i1.wp.com/koperasinaker.id/assets/gambar/loading1.gif" width="100%" />');
        $.ajax( {
          type: "POST",
          url: form.attr( 'action' ),
          data: form.serialize(),
          success: function( response ) {
              $('#login #result').html(response);
              $('#login input').prop('disabled', false);
          $('#login button').prop('disabled', false);
          $('#login #password').val('');
          },
          error: function(){
              alert('Terjadi kesalahan tidak terduga!');
              $('#login input').prop('disabled', false);
          $('#login button').prop('disabled', false);
          }
        } );
        $('#login input').prop('disabled', true);
      $('#login button').prop('disabled', true);
        return false;
  });
  return false;
}


function myFunctionbbbb() {
    confirm("Press a button!");
}
// ====================================================== Menghapus Artikel ======================================== //

$(".list-artikel .hapus").click(function(){ //inisialisasi link hapus di klik
        var artikelId = $(this).data("hapus");
        hapus_artikel(artikelId);
        return false;
});

function hapus_artikel(id) //fungsi hapus artikel
{
        var r = confirm("Apakah Anda yakin?"); //konfirmasi
        if (r == true) { //jika konfirmsai yes
              $('.artikel-'+id).slideUp(400);
              $.get("?view=catatan&hapus="+id);
              setTimeout(function() {
                    $.get( "ajax.php?act=list_catatan&page="+ambil('page'), function( data ) {
                         $('#artikel-cover').html(data);
                    });
              }, 400);
           
        } else {
           
        }
}
// ==================================================================================================================== //




var myEditor;
// ====================================== CK Editor ================================== //
if(ambil('new') == "" || ambil('edit')) {
  $('.loader').show();

      (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = 'https://cdn.ckeditor.com/ckeditor5/11.1.1/classic/ckeditor.js';
         // s.setAttribute('onreadystatechange', bunga());
          (d.head || d.body).appendChild(s);
          })();

      $( window ).load(function() {
        // Run code
         
        ClassicEditor
              .create( document.querySelector( '#editor' ) ) //setting pada element ID #editor
              .then( editor => {
                  console.log( 'Editor was initialized', editor );
                  myEditor = editor;
                  $('.loader').hide();
                  if(ambil('edit'))
                  {
                    get_catatan();
                  } 
              } )
              .catch( error => {
                  console.error( error );
              } );
      });
      

}
// =========================================================================== //

function get_catatan()
{
  $('.loader').show();
  var id = ambil('edit');
    $.getJSON( "ajax.php?act=get_catatan&id="+id, function( json ) {
     // console.log( "JSON Data: " + json[ 0 ] );
      $('#edit-catatan #judul').val(json[ 0 ]);
      myEditor.setData(json[ 1 ]);
      $('.loader').hide();
   });
}


// ============================================================ ADD Catatan ========================================================== //
$("#add-catatan").submit(function(){
  var form = $('#add-catatan form');
    $.ajax( {
      type: "POST",
      url: form.attr( 'action' ),
      data: form.serialize(),
      success: function( response ) {
          window.location.href = '?view=catatan&id='+response;
      },
      error: function(){
          info('Terjadi kesalahan tidak terduga!');
          $('#add-catatan button').prop('disabled', false);
          $('#add-catatan input').prop('disabled', false);
          $('.loader').hide();
      }
    } );
   
    $('#add-catatan button').prop('disabled', true);
    $('#add-catatan input').prop('disabled', true);
    $('.loader').show();

    return false;
});
// ========================================================================================================================================= //


// ============================================================ Edit Catatan ========================================================== //
$("#edit-catatan").submit(function(){
  var form = $('#edit-catatan form');
    $.ajax( {
      type: "POST",
      url: form.attr( 'action' ),
      data: form.serialize(),
      success: function( response ) {
          window.location.href = '?view=catatan&id='+ambil('edit');
         //alert(response);
      },
      error: function(){
          info('Terjadi kesalahan tidak terduga!');
          $('#add-catatan button').prop('disabled', false);
          $('#add-catatan input').prop('disabled', false);
          $('.loader').hide();
      }
    } );
   
    $('#add-catatan button').prop('disabled', true);
    $('#add-catatan input').prop('disabled', true);
    $('.loader').show();

    return false;
});
// ========================================================================================================================================= //
