import { Tabs, Tab, useTheme, TabProps, Popover, IconButton, SxProps } from "@mui/material"
import Link from "next/link"
import { Category } from "../data/data.types"
import { getCategoryLabel, CategoryIcon, allCategories } from "./Categories.common"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { useState, MouseEvent, ReactNode, ComponentProps } from "react"

type Post_list_section_categories_tabs_props = {
  sx?: SxProps
  activeTab?: Category
  setActiveTab(c: Category): void
}

export default function Categories_selector_tabs({
  sx,
  activeTab,
  setActiveTab,
}: Post_list_section_categories_tabs_props) {
  const [additionalTabsShownAnchorEl, setAdditionalTabsShownAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  function handle_showMoreTabs(event: MouseEvent<HTMLButtonElement>) {
    setAdditionalTabsShownAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Categories_tabs
        sx={sx}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        options={allCategories.slice(0, 3)}
      >
        <IconButton onClick={handle_showMoreTabs}>
          <KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Categories_tabs>
      <Popover
        open={!!additionalTabsShownAnchorEl}
        anchorEl={additionalTabsShownAnchorEl}
        onClose={() => setAdditionalTabsShownAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            left: "unset !important",
            right: 0,
          },
        }}
      >
        <Categories_tabs
          sx={{ display: "flex", flexDirection: "column", gap: 2, background: "#2d5be3" }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orientation="vertical"
          options={allCategories.slice(3)}
        />
      </Popover>
    </>
  )
}

type Categories_tabs_props = ComponentProps<typeof Tabs> & {
  activeTab?: Category
  setActiveTab(c: Category): void
  options: Category[]
  children?: ReactNode
  tabProps?: Partial<ComponentProps<typeof Tab>>
}

function Categories_tabs({
  activeTab,
  setActiveTab,
  children,
  options,
  sx,
  tabProps,
  ...otherProps
}: Categories_tabs_props) {
  const theme = useTheme()

  return (
    <Tabs
      sx={{
        px: 1,
        ".MuiTabs-indicator": {
          background: "white",
          height: 3,
        },
        ".Mui-selected": {
          color: "white !important",
        },
        ...sx,
      }}
      value={activeTab}
      centered
      onChange={(e, newValue) => setActiveTab(newValue)}
      variant="fullWidth"
      {...otherProps}
    >
      {options.map(tab => (
        <LinkTab
          key={tab}
          sx={{
            textTransform: "none",
            fontSize: theme.typography.h6,
            color: "white",
            ".Mui-selected": {
              color: "white !important",
            },
            fontWeight: 400,
          }}
          label={getCategoryLabel(tab)}
          value={tab}
          icon={<CategoryIcon name={tab} />}
          linkProps={{
            href: {
              query: { name: tab },
            },
          }}
          onClick={() => setActiveTab(tab)}
          {...tabProps}
        />
      ))}
      {children}
    </Tabs>
  )
}

function LinkTab(props: TabProps & { linkProps: ComponentProps<typeof Link> }) {
  return <Tab component={linkProps => <Link {...linkProps} {...props.linkProps} />} {...props} />
}
