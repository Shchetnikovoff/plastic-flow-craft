import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Troynik from "./pages/Troynik";
import Razdvizhnoy from "./pages/Razdvizhnoy";
import Vozdukhovod from "./pages/Vozdukhovod";
import CatalogPage from "./pages/CatalogPage";
import EmkostiPage from "./pages/EmkostiPage";
import EmkostiPodzemnye from "./pages/EmkostiPodzemnye";
import EmkostiPryamougolnye from "./pages/EmkostiPryamougolnye";
import EmkostiPozharnye from "./pages/EmkostiPozharnye";
import EmkostiKislotyShchelochi from "./pages/EmkostiKislotyShchelochi";
import EmkostiPerelivnye from "./pages/EmkostiPerelivnye";
import EmkostiCatalog from "./pages/EmkostiCatalog";
import EmkostiVertikalnye from "./pages/EmkostiVertikalnye";
import EmkostiEvpp from "./pages/EmkostiEvpp";
import EmkostiEvppSloped from "./pages/EmkostiEvppSloped";
import EmkostiEvppConical from "./pages/EmkostiEvppConical";
import EmkostiEvppConusDno from "./pages/EmkostiEvppConusDno";
import Vodoochistka from "./pages/Vodoochistka";
import VodoochistkaFfu from "./pages/VodoochistkaFfu";
import VodoochistkaLamelnyj from "./pages/VodoochistkaLamelnyj";
import VodoochistkaObezvozhivatel from "./pages/VodoochistkaObezvozhivatel";
import VodoochistkaDozirovanie from "./pages/VodoochistkaDozirovanie";
import VodoochistkaZhirouloviteli from "./pages/VodoochistkaZhirouloviteli";
import VodoochistkaLos from "./pages/VodoochistkaLos";
import VodoochistkaShkafyDozirovaniya from "./pages/VodoochistkaShkafyDozirovaniya";
import GazoochistkaSkrubbery from "./pages/GazoochistkaSkrubbery";
import ZhuPodzemnyeVertikalnye from "./pages/ZhuPodzemnyeVertikalnye";
import ZhuNazemnyeVertikalnye from "./pages/ZhuNazemnyeVertikalnye";
import ZhuGorizontalnye from "./pages/ZhuGorizontalnye";
import ZhuPryamougolnye from "./pages/ZhuPryamougolnye";
import GazoochistkaFvg from "./pages/GazoochistkaFvg";
import GazoochistkaKapleuloviteli from "./pages/GazoochistkaKapleuloviteli";
import GazoochistkaPage from "./pages/GazoochistkaPage";
import VentilyatsiyaPage from "./pages/VentilyatsiyaPage";
import ReaktoryPage from "./pages/ReaktoryPage";
import GidrometallurgiyaPage from "./pages/GidrometallurgiyaPage";
import KnsPage from "./pages/KnsPage";
import GalvanikaPage from "./pages/GalvanikaPage";
import VodopodgotovkaPage from "./pages/VodopodgotovkaPage";
import LabMebelPage from "./pages/LabMebelPage";
import ShkafyUpravleniyaPage from "./pages/ShkafyUpravleniyaPage";
import UslugiPage from "./pages/UslugiPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/60" element={<Index angle={60} />} />
          <Route path="/45" element={<Index angle={45} />} />
          <Route path="/30" element={<Index angle={30} />} />
          <Route path="/15" element={<Index angle={15} />} />
          <Route path="/troynik" element={<Troynik />} />
          <Route path="/razdvizhnoy" element={<Razdvizhnoy />} />
          <Route path="/vozdukhovod" element={<Vozdukhovod />} />
          <Route path="/product/:article" element={<Product />} />
          <Route path="/catalog/emkosti/konfigurator" element={<EmkostiCatalog />} />
          <Route path="/catalog/emkosti/vertikalnye/ploskaya" element={<EmkostiEvpp />} />
          <Route path="/catalog/emkosti/vertikalnye/naklonnoe-dno" element={<EmkostiEvppSloped />} />
          <Route path="/catalog/emkosti/vertikalnye/konicheskaya-krysha" element={<EmkostiEvppConical />} />
          <Route path="/catalog/emkosti/vertikalnye" element={<EmkostiVertikalnye />} />
          <Route path="/catalog/emkosti/podzemnye" element={<EmkostiPodzemnye />} />
          <Route path="/catalog/emkosti/pryamougolnye" element={<EmkostiPryamougolnye />} />
          <Route path="/catalog/emkosti/pozharnye" element={<EmkostiPozharnye />} />
          <Route path="/catalog/emkosti/kisloty-shchelochi" element={<EmkostiKislotyShchelochi />} />
          <Route path="/catalog/emkosti/perelivnye-bassejny" element={<EmkostiPerelivnye />} />
          <Route path="/catalog/emkosti" element={<EmkostiPage />} />
          <Route path="/catalog/vodoochistka/ffu" element={<VodoochistkaFfu />} />
          <Route path="/catalog/vodoochistka/lamelnyj-otstojnik" element={<VodoochistkaLamelnyj />} />
          <Route path="/catalog/vodoochistka/meshochnyj-obezvozhivatel" element={<VodoochistkaObezvozhivatel />} />
          <Route path="/catalog/vodoochistka/stantsiya-dozirovaniya" element={<VodoochistkaDozirovanie />} />
          <Route path="/catalog/vodoochistka/zhirouloviteli/podzemnye-vertikalnye" element={<ZhuPodzemnyeVertikalnye />} />
          <Route path="/catalog/vodoochistka/zhirouloviteli/nazemnye-vertikalnye" element={<ZhuNazemnyeVertikalnye />} />
          <Route path="/catalog/vodoochistka/zhirouloviteli/gorizontalnye" element={<ZhuGorizontalnye />} />
          <Route path="/catalog/vodoochistka/zhirouloviteli/pryamougolnye" element={<ZhuPryamougolnye />} />
          <Route path="/catalog/vodoochistka/zhirouloviteli" element={<VodoochistkaZhirouloviteli />} />
          <Route path="/catalog/vodoochistka/los" element={<VodoochistkaLos />} />
          <Route path="/catalog/vodoochistka/shkafy-dozirovaniya" element={<VodoochistkaShkafyDozirovaniya />} />
          <Route path="/catalog/vodoochistka" element={<Vodoochistka />} />
          <Route path="/catalog/gazoochistka/skrubbery" element={<GazoochistkaSkrubbery />} />
          <Route path="/catalog/gazoochistka/fvg" element={<GazoochistkaFvg />} />
          <Route path="/catalog/gazoochistka/kapleuloviteli" element={<GazoochistkaKapleuloviteli />} />
          <Route path="/catalog/gazoochistka" element={<GazoochistkaPage />} />
          <Route path="/catalog/ventilyatsiya" element={<VentilyatsiyaPage />} />
          <Route path="/catalog/reaktory" element={<ReaktoryPage />} />
          <Route path="/catalog/gidrometallurgiya" element={<GidrometallurgiyaPage />} />
          <Route path="/catalog/kns" element={<KnsPage />} />
          <Route path="/catalog/galvanika" element={<GalvanikaPage />} />
          <Route path="/catalog/vodopodgotovka" element={<VodopodgotovkaPage />} />
          <Route path="/catalog/labmebel" element={<LabMebelPage />} />
          <Route path="/catalog/shkafy-upravleniya" element={<ShkafyUpravleniyaPage />} />
          <Route path="/catalog/uslugi" element={<UslugiPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:categorySlug" element={<CatalogPage />} />
          <Route path="/catalog/:categorySlug/:subSlug" element={<CatalogPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
