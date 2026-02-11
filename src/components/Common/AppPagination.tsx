import { useMemo } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface AppPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  scrollToTop?: boolean
}

export default function AppPagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  scrollToTop = true,
}: AppPaginationProps) {
  if (totalPages <= 1) return null

  const handleChange = (newPage: number) => {
    if (newPage === page) return
    onPageChange(newPage)

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const pages = useMemo(() => {
    const range: (number | "ellipsis")[] = []

    const leftSiblingIndex = Math.max(page - siblingCount, 1)
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages)

    const showLeftEllipsis = leftSiblingIndex > 2
    const showRightEllipsis = rightSiblingIndex < totalPages - 1

    // Always show first page
    range.push(1)

    if (showLeftEllipsis) {
      range.push("ellipsis")
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        range.push(i)
      }
    }

    if (showRightEllipsis) {
      range.push("ellipsis")
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages)
    }

    return range
  }, [page, totalPages, siblingCount])

  return (
    <Pagination className="mt-8">
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && handleChange(page - 1)}
            className={
              page === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((p, index) => (
          <PaginationItem key={`${p}-${index}`}>
            {p === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === page}
                onClick={() => handleChange(p as number)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              page < totalPages && handleChange(page + 1)
            }
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
