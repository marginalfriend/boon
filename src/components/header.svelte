<script lang="ts">
  import {page} from "$app/state"
  
  const pathname = $derived(page.url.pathname);
  
  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }
</script>

<header class="flex flex-col w-full">
    <nav class="tui-nav flex w-full">
        <a 
            href="/" 
            class="flex-1 text-center"
            class:active={isActive("/")}
        >
            Home
        </a>
        <a 
            href="/blogs" 
            class="flex-1 text-center"
            class:active={isActive("/blogs")}
        >
            Blogs
        </a>
        <a 
            href="/portfolio" 
            class="flex-1 text-center"
            class:active={isActive("/portfolio")}
        >
            Portfolio
        </a>
    </nav>

    <div class="tui-path">
        ~{pathname === "/" ? "/home" : pathname}
    </div>
</header>
