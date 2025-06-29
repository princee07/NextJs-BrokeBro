
import NavbarWrapper from "../../components/layout/NavbarWrapper";
export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
   
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
     <NavbarWrapper />
        {children}
      </div>
     
    </div>
  );
}

// This layout component is designed to wrap around the content of the categories page.
// It provides a flexible layout with a scrollable area for the main content.
// The `children` prop allows for dynamic content to be injected into this layout.
// The `flex-1` class ensures that the content area takes up the available space,
// while `overflow-y-auto` enables vertical scrolling if the content exceeds the viewport height.


// Usage:
// This layout can be used in the categories page like this:


// import Layout from './layout';
// export default function CategoriesPage() {

