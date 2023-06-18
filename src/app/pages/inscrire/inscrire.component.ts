import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { throwError } from 'rxjs';
import { InscriptionService } from '../../services/inscription.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InscriptionEtudiant } from '../../models/inscriptionEtudiant.model';
declare var $: any;

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss']
})
export class InscrireComponent {

  @Input() action !: "create" | "edit" | "view"

  id!:string
  numero!:string
  etablissement!:string
  annee!:string
  prenom_etudiant!:string
  niveau!:string
  somme!:string

  isLoading!:boolean
  message!: string;
  dataSource: any;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private inscriptionService:InscriptionService,
    public _location : Location,

  ) {}


  ngOnInit() {


    if (this.id) {
      this.initForUpdate(this.id)
   }
   console.log(this.id);
   console.log(this.action)

    // Votre code JavaScript Owl Carousel ici
    $(document).ready(function () {

      var windows = $(window);
      var stick = $(".header-sticky");
    windows.on('scroll',function() {    
      var scroll = windows.scrollTop();
      if (scroll < 5) {
        stick.removeClass("sticky");
      }else{
        stick.addClass("sticky");
      }
    });  
  /*------------------------------------
    jQuery MeanMenu 
  --------------------------------------*/
    $('.main-menu nav').meanmenu({
      meanScreenWidth: "767",
      meanMenuContainer: '.mobile-menu'
    });
      
      
      /* last  2 li child add class */
      $('ul.menu>li').slice(-2).addClass('last-elements');
  /*------------------------------------
    Owl Carousel
  --------------------------------------*/
      $('.slider-owl').owlCarousel({
          loop:true,
          nav:true,
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          smartSpeed: 2500,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
          responsive:{
              0:{
                  items:1
              },
              768:{
                  items:1
              },
              1000:{
                  items:1
              }
          }
      });
  
      $('.partner-owl').owlCarousel({
          loop:true,
          nav:true,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
          responsive:{
              0:{
                  items:1
              },
              768:{
                  items:3
              },
              1000:{
                  items:5
              }
          }
      });  
  
      $('.testimonial-owl').owlCarousel({
          loop:true,
          nav:true,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
          responsive:{
              0:{
                  items:1
              },
              768:{
                  items:1
              },
              1000:{
                  items:1
              }
          }
      });
  /*------------------------------------
    Video Player
  --------------------------------------*/
      $('.video-popup').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          zoom: {
              enabled: true,
          }
      });
      
      $('.image-popup').magnificPopup({
          type: 'image',
          gallery:{
              enabled:true
          }
      }); 
  /*----------------------------
      Wow js active
  ------------------------------ */

  /*------------------------------------
    Scrollup
  --------------------------------------*/
      $.scrollUp({
          scrollText: '<i class="fa fa-angle-up"></i>',
          easingType: 'linear',
          scrollSpeed: 900,
          animation: 'fade'
      });
  /*------------------------------------
    Nicescroll
  --------------------------------------*/
      // $(".notice-left").niceScroll({
      //     cursorcolor: "#EC1C23",
      //     cursorborder: "0px solid #fff",
      //     autohidemode: false,
      // });
  
      /*-----------------------
          Search Toggle
      ------------------------- */
      let searchSelector = document.querySelector('.search-toggle');
      const searchBox = document.querySelector('.search');
      
      if (searchSelector && searchBox) {
        searchSelector.addEventListener('click', function () {
          searchBox.classList.toggle('open');
        });
      }
    });
  }



  initForUpdate(inscriptionID: string) {
    this.inscriptionService.getEtudiantById(inscriptionID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.id = (data as any).message.id;
      this.numero = (data as any).message.numero;
      this.etablissement = (data as any).message.etablissement;
      this.annee = (data as any).message.annee;
      this.prenom_etudiant = (data as any).message.prenom_etudiant;
      this.niveau = (data as any).message.niveau;
      this.somme = (data as any).message.somme;
    });
    
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  onSubmitForm(form: NgForm) {

    this.isLoading = true
    const InscriptionEtudiant: InscriptionEtudiant = form.value;

    InscriptionEtudiant.id = this.id


    if(this.action === 'edit') {
       this.inscriptionService.updateEtudiant(InscriptionEtudiant).pipe(catchError((error:HttpErrorResponse)=>{
         console.log(error.status);
         this.isLoading = false
         location.reload()
         return []
       })).subscribe(
         (data) => {

           console.log(data);
         
         },
         (Error) => console.log(Error)
       );
    } else {
      
      this.inscriptionService.addEtudiants(InscriptionEtudiant).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        this.isLoading = false
        location.reload()
        return []
      })).subscribe(
        (data) => {

          console.log(data);
          
        },
        (error) => console.log(error)
      );
    }
  }


}
