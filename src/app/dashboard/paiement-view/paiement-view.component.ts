import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { InscriptionService } from '../../services/inscription.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PaiementService } from 'src/app/services/paiement.service';
import { PaiementComponent } from 'src/app/forms/paiement/paiement.component';
import { Paiement } from '../../models/paiement.model';
declare var $: any;
@Component({
  selector: 'app-paiement-view',
  templateUrl: './paiement-view.component.html',
  styleUrls: ['./paiement-view.component.scss']
})
export class PaiementViewComponent {

  dataSource!: any;
  displayedColumns = [
    'nom',
    'prenom',
    'email',
    'options',
    // 'adresse',
    'domaine',
    'cycle',
    'montant',
    'Actions'
  ];


  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private paiementService:PaiementService
  ) { }


  ngOnInit(): void {

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
    
     this.initpaiement()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initpaiement() {this.isLoading=true;
    this.paiementService.getPaiement().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(data.message);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  imprimer() {
    const url = 'http://localhost:8000/impression/liste/paiement';
    const newWindow = window.open(url, '_blank');
    
    // Vérifier si l'ouverture de la fenêtre a été bloquée par le navigateur
    if (newWindow === null) {
      alert('La fenêtre d\'impression a été bloquée par le navigateur. Veuillez autoriser les fenêtres contextuelles pour afficher le fichier PDF.');
    }
  }

  create() {
    const refview = this.dialog.open(PaiementComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  edit(paiement: Paiement) {
    const ref = this.dialog.open(PaiementComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.id = paiement.id;
  }


  view(paiement: Paiement) {
    const refview = this.dialog.open(PaiementComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.id = paiement.id;
  }

   delete(Paiement:Paiement) {
     const ref = this.dialog.open(AlertComponent);
     ref.componentInstance.type = 'danger';
     ref.componentInstance.contenu =
       'Voulez vous supprimer le paiement de l\'etudiant ' + Paiement.nom + ' ?';
     ref.afterClosed().subscribe((result) => {
       if (result) {
         this.paiementService.delete(Paiement.id).pipe(catchError((error:HttpErrorResponse)=>{
           console.log(error.status);
           return []
         })).subscribe((data) => {
           console.log(data);
          location.reload()
         });
       }
     });
     console.log(Paiement);
   }


}
